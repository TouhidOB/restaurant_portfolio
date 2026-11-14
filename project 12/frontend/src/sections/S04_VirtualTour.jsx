import React from 'react';
import { useCMS } from '../context/CMSContext';
import RestaurantTour from '../components/three/RestaurantTour';

export default function S04_VirtualTour() {
  const { content, activeTourIndex, openReservationModal } = useCMS();
  const tourData = content?.editorial_sections?.s04_tour || {
    badge: "3D INTERACTIVE WEBGL VIRTUAL TOUR",
    title: "Step Inside the Villa",
    description: "Experience our architectural estate from anywhere in the world. Traverse the sunlit courtyard, the grand dining salon, and the panoramic cliffside terrace."
  };

  const viewpoints = content.tour_viewpoints || [];
  const currentVp = viewpoints[activeTourIndex] || viewpoints[0] || {};

  return (
    <section id="tour" className="editorial-section" style={{ backgroundColor: 'var(--c-limestone-light)' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '2.5rem' }}>
          <div style={{ maxWidth: '680px' }}>
            <span className="text-eyebrow" style={{ display: 'block', marginBottom: '8px' }}>
              {tourData.badge}
            </span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
                color: 'var(--c-navy)',
                lineHeight: 1.15,
                marginBottom: '12px',
              }}
            >
              {tourData.title}
            </h2>
            <p style={{ color: '#595752', fontSize: '0.98rem', lineHeight: 1.7 }}>
              {tourData.description}
            </p>
          </div>

          <div>
            <button onClick={openReservationModal} className="btn-primary">
              Reserve a Table Here &rarr;
            </button>
          </div>
        </div>

        {/* 3D WebGL Canvas Tour Container */}
        <div style={{ marginBottom: '2rem' }}>
          <RestaurantTour />
        </div>

        {/* Current Viewpoint Info Panel */}
        {currentVp.title && (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '28px 32px',
              border: '1px solid var(--c-border)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span className="badge-tag">
                  Scene #{currentVp.order || activeTourIndex + 1}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#596448', fontWeight: 600 }}>
                  🌿 {currentVp.atmosphere || 'Mediterranean Ambiance'}
                </span>
              </div>
              <h3 style={{ fontSize: '1.6rem', color: 'var(--c-navy)', marginBottom: '6px' }}>
                {currentVp.title}
              </h3>
              <p style={{ color: '#6A635B', fontSize: '0.92rem', lineHeight: 1.6 }}>
                {currentVp.description}
              </p>
            </div>

            {currentVp.highlights && currentVp.highlights.length > 0 && (
              <div>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--c-terracotta)', fontWeight: 700, marginBottom: '8px' }}>
                  Architectural Highlights
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {currentVp.highlights.map((h, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '6px',
                        backgroundColor: 'var(--c-ivory)',
                        border: '1px solid var(--c-border)',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        color: 'var(--c-navy)',
                      }}
                    >
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}

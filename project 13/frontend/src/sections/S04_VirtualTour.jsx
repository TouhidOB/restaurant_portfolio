import React from 'react';
import { useCMS } from '../context/CMSContext';
import RestaurantTour from '../components/three/RestaurantTour';

export default function S04_VirtualTour() {
  const { content, activeTourIndex, openReservationModal } = useCMS();
  const tourData = content?.editorial_sections?.s04_tour || {
    badge: "3D INTERACTIVE WEBGL VIRTUAL TOUR",
    title: "Traverse the Seoul Street Pocha",
    description: "Step into our late-night dining world. Walk along the wet neon-lit street alley, pull up a plastic pocha stool, or stand before our roaring open kitchen woks."
  };

  const viewpoints = content.tour_viewpoints || [];
  const currentVp = viewpoints[activeTourIndex] || viewpoints[0] || {};

  return (
    <section id="tour" className="editorial-section" style={{ backgroundColor: '#0B0D0F' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '2.5rem' }}>
          <div style={{ maxWidth: '680px' }}>
            <span className="text-eyebrow" style={{ display: 'block', marginBottom: '8px' }}>
              {tourData.badge}
            </span>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
                color: '#F6F4F0',
                lineHeight: 1.15,
                marginBottom: '12px',
              }}
            >
              {tourData.title}
            </h2>
            <p style={{ color: 'var(--color-silver)', fontSize: '0.98rem', lineHeight: 1.7 }}>
              {tourData.description}
            </p>
          </div>

          <div>
            <button onClick={openReservationModal} className="btn-primary">
              Reserve a Spot Here &rarr;
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
              backgroundColor: 'var(--color-charcoal)',
              borderRadius: '12px',
              padding: '28px 32px',
              border: '1px solid var(--color-border)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span className="badge-tag">
                  Scene 0{currentVp.sort_order || activeTourIndex + 1}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-amber)', fontWeight: 600 }}>
                  🏮 {currentVp.atmosphere || 'Seoul Night Atmosphere'}
                </span>
              </div>
              <h3 style={{ fontSize: '1.6rem', color: '#FFFFFF', marginBottom: '6px' }}>
                {currentVp.title}
              </h3>
              <p style={{ color: 'var(--color-silver)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                {currentVp.description}
              </p>
            </div>

            {currentVp.highlights && currentVp.highlights.length > 0 && (
              <div>
                <div style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-cyan)', fontWeight: 700, marginBottom: '8px' }}>
                  Atmospheric Details
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {currentVp.highlights.map((h, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '6px',
                        backgroundColor: 'var(--color-midnight)',
                        border: '1px solid var(--color-border)',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        color: 'var(--color-white)',
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

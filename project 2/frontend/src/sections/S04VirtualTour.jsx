import React from 'react';
import RestaurantTour from '../components/three/RestaurantTour';

export default function S04VirtualTour({ tourViewpoints }) {
  return (
    <section
      id="tour"
      style={{
        padding: 'var(--section-spacing) 0',
        backgroundColor: 'var(--color-charcoal)',
        color: 'var(--color-rice-paper)',
      }}
    >
      <div className="zen-container">
        {/* Section Heading */}
        <div style={{ maxWidth: '680px', marginBottom: '48px' }}>
          <div className="zen-eyebrow" style={{ color: 'var(--color-bamboo)' }}>
            VIRTUAL SANCTUARY TOUR
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 54px)', color: '#FFFFFF', marginBottom: '8px' }}>
            A Space Designed for Harmony.
          </h2>
          <p className="font-jp" style={{ fontSize: '15px', color: 'var(--color-bamboo-light)', marginBottom: '16px' }}>
            建築と静寂の五景
          </p>
          <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--color-stone)' }}>
            Explore the spaces, natural materials, and quiet atmosphere that shape our dining experience before stepping into our pavilion physically.
          </p>
        </div>

        {/* 3D Panoramic Tour Viewer */}
        <RestaurantTour viewpoints={tourViewpoints} />
      </div>
    </section>
  );
}

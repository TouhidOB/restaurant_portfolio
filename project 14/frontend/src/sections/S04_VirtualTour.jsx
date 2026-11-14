import React from 'react';
import RestaurantTour from '../components/three/RestaurantTour';
import { useCMS } from '../context/CMSContext';

export default function S04_VirtualTour() {
  const { data } = useCMS();
  const viewpoints = data?.viewpoints || [];

  return (
    <section id="tour" style={{ backgroundColor: 'var(--color-obsidian)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="section-container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
            SPATIAL ARCHITECTURE & FIVE VIEWPOINTS
          </div>
          <h2 className="section-title">
            Explore the Sanctuary
          </h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Navigate our five architectural viewpoints in real-time 3D WebGL or high-resolution photography—from the Lexington Avenue basalt portal to our sommelier vault.
          </p>
        </div>

        {/* 3D Interactive Virtual Tour Canvas */}
        <RestaurantTour viewpoints={viewpoints} />
      </div>
    </section>
  );
}

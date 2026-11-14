import React, { useState } from 'react';
import RestaurantTour from '../components/three/RestaurantTour';
import { useCMS } from '../context/CMSContext';

export default function S04VirtualTour() {
  const { content } = useCMS();
  const [activeIdx, setActiveIdx] = useState(0);

  const tour = content?.virtualTour || {};
  const viewpoints = tour.viewpoints || [];

  return (
    <section id="tour" className="py-section" style={{ backgroundColor: 'var(--color-graphite)', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
          <span className="section-label">{tour.subtitle || 'Explore The Five Spaces'}</span>
          <h2 className="section-title">
            {tour.title || 'Restaurant Virtual Tour'}
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            {tour.description || 'Navigate our converted industrial warehouse in full 3D from the street-level entrance to the roaring open kitchen.'}
          </p>
        </div>

        {/* 3D Canvas Tour Component */}
        {viewpoints.length > 0 && (
          <RestaurantTour
            viewpoints={viewpoints}
            activeIndex={activeIdx}
            onChangeViewpoint={(idx) => setActiveIdx(idx)}
          />
        )}
      </div>
    </section>
  );
}

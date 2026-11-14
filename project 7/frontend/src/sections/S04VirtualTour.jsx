import React, { useState } from 'react';
import RestaurantTour from '../components/three/RestaurantTour';
import { useCMS } from '../context/CMSContext';

export default function S04VirtualTour() {
  const { content } = useCMS();
  const [activeIdx, setActiveIdx] = useState(0);

  const tour = content?.tour || {};
  const viewpoints = tour.viewpoints || [];

  return (
    <section id="visite-3d" className="py-section" style={{ backgroundColor: '#1A1B1D', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
          <span className="section-label">{tour.subtitle || 'Explorer les Salons Particuliers'}</span>
          <h2 className="section-title">
            {tour.title || 'Visite Virtuelle Immersive'}
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            {tour.description || "Parcourez en trois dimensions l'architecture néoclassique et les ambiances tamisées de notre maison."}
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

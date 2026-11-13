import React from 'react';
import RestaurantTour from '../components/three/RestaurantTour';

export default function TourSection({ viewpoints, sectionData = {} }) {
  const eyebrow = sectionData.eyebrow || 'ARCHITECTURAL EXPLORATION';
  const title = sectionData.title || 'A Cinematic Virtual Tour.';
  const description =
    sectionData.description ||
    'Step inside Aurelia before you visit. Navigate our five curated architectural vantage points, from the exterior promenade to the bustling open kitchen pass.';

  return (
    <section
      id="tour"
      style={{
        backgroundColor: '#0A1E1A',
        position: 'relative',
        paddingTop: '80px',
        paddingBottom: '80px',
        borderBottom: '1px solid var(--color-border-gold-subtle)',
      }}
    >
      <div className="container" style={{ marginBottom: '40px', textAlign: 'center' }}>
        <div className="eyebrow" style={{ justifyContent: 'center' }}>
          {eyebrow}
        </div>
        <h2
          style={{
            fontSize: 'clamp(32px, 4.5vw, 56px)',
            color: 'var(--color-pearl)',
            marginBottom: '16px',
          }}
        >
          {title}
        </h2>
        <p
          style={{
            maxWidth: '620px',
            margin: '0 auto',
            fontSize: '15px',
            color: 'var(--color-pearl-muted)',
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>
      </div>

      <div className="container-wide" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
        <div className="deco-frame" style={{ borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
          <RestaurantTour viewpoints={viewpoints} />
        </div>
      </div>
    </section>
  );
}

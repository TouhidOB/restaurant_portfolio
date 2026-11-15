import React from 'react';
import { useCMS } from '../context/CMSContext';
import RestaurantTour from '../components/three/RestaurantTour';

export default function TourPage({ onNavigateHome, onOpenReservation }) {
  const { content, activeTourIndex, setActiveTourIndex } = useCMS();
  const viewpoints = content.viewpoints || [];
  const currentViewpoint = viewpoints[activeTourIndex] || viewpoints[0] || {};

  return (
    <div style={{ paddingTop: 'calc(var(--header-height) + 3rem)', paddingBottom: '6rem', minHeight: '100vh', backgroundColor: 'var(--bg-dark)' }}>
      <div className="container-brutal">
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
          <button onClick={onNavigateHome} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}>
            INDEX
          </button>
          <span style={{ color: 'var(--border-light)' }}>/</span>
          <span style={{ color: 'var(--accent-orange)' }}>08. 3D SPATIAL TOUR</span>
        </div>

        {/* Hero Header */}
        <div style={{ borderBottom: '2px solid var(--border-steel)', paddingBottom: '2.5rem', marginBottom: '3rem' }}>
          <span className="section-tag">INTERACTIVE SPATIAL EXPLORER &bull; FIVE VECTORS</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, marginTop: '0.75rem', textTransform: 'uppercase' }}>
            3D SPATIAL TOUR.
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.9rem, 2vw, 1.15rem)', color: 'var(--accent-orange)', marginTop: '1rem', maxWidth: '800px', lineHeight: 1.6 }}>
            Navigate five distinct architectural vectors of Monolith. Inspect concrete joins, basalt slabs, and hearth focal points.
          </p>
        </div>

        {/* Tour Canvas Container */}
        <div style={{ background: '#000', border: '1px solid var(--border-steel)', position: 'relative', height: '560px', marginBottom: '2rem' }}>
          <RestaurantTour />

          {/* Current Vector HUD Overlay */}
          <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', background: 'rgba(32,33,31,0.92)', border: '1px solid var(--accent-orange)', padding: '1rem 1.25rem', maxWidth: '320px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-orange)', fontWeight: 700 }}>
              VECTOR {currentViewpoint.code || 'V01'} // {currentViewpoint.room_label || 'CHAMBER'}
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0.25rem 0 0.5rem', textTransform: 'uppercase' }}>
              {currentViewpoint.title}
            </h3>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              {currentViewpoint.description}
            </p>
          </div>
        </div>

        {/* Viewpoint Selector Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '3.5rem' }}>
          {viewpoints.map((vp, idx) => {
            const isActive = idx === activeTourIndex;
            return (
              <button
                key={vp.id || idx}
                type="button"
                onClick={() => setActiveTourIndex(idx)}
                style={{
                  background: isActive ? 'var(--bg-card)' : 'var(--bg-surface)',
                  border: '1px solid ' + (isActive ? 'var(--accent-orange)' : 'var(--border-steel)'),
                  borderTop: isActive ? '3px solid var(--accent-orange)' : '1px solid var(--border-steel)',
                  padding: '1rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: isActive ? 'var(--accent-orange)' : 'var(--text-muted)' }}>
                  VECTOR 0{idx + 1}
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginTop: '0.2rem' }}>
                  {vp.room_label || vp.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-steel)', padding: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
              SELECT YOUR SEATING CHAMBER
            </h3>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Specify your preferred chamber when booking your reservation with the Maître d'.
            </p>
          </div>
          <button onClick={onOpenReservation} className="btn-orange" style={{ padding: '0.75rem 2rem' }}>
            RESERVE IN THIS ZONE &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

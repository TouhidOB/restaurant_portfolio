import React from 'react';
import { useCMS } from '../../context/CMSContext';
import RestaurantTour from '../three/RestaurantTour';

export default function TourSection() {
  const { content, activeTourIndex, setActiveTourIndex, tourMode, setTourMode } = useCMS();
  const s08 = content.sections?.virtual_tour || {};
  const viewpoints = content.viewpoints || [];
  const current = viewpoints[activeTourIndex] || viewpoints[0] || {};

  return (
    <section id="tour" className="section-shell">
      <div className="container-brutal">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div>
            <div className="section-tag">
              SECTION 08 // {s08.eyebrow || 'SPATIAL EXPLORATION'}
            </div>
            <h2 className="section-heading" style={{ marginBottom: '0.5rem' }}>
              {s08.title || 'STEP INSIDE.'}
            </h2>
            <p className="section-lead">
              {s08.subtitle || 'Interact with 5 architectural viewpoints rendered in 3D WebGL and high-resolution spatial capture.'}
            </p>
          </div>

          {/* Mode Switcher: 3D vs Photo */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setTourMode('3d')}
              style={{
                background: tourMode === '3d' ? 'var(--accent-orange)' : 'transparent',
                color: tourMode === '3d' ? '#000' : 'var(--text-secondary)',
                border: '1px solid',
                borderColor: tourMode === '3d' ? 'var(--accent-orange)' : 'var(--border-steel)',
                padding: '0.5rem 1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              3D WEBGL ENGINE
            </button>
            <button
              type="button"
              onClick={() => setTourMode('photo')}
              style={{
                background: tourMode === 'photo' ? 'var(--accent-orange)' : 'transparent',
                color: tourMode === 'photo' ? '#000' : 'var(--text-secondary)',
                border: '1px solid',
                borderColor: tourMode === 'photo' ? 'var(--accent-orange)' : 'var(--border-steel)',
                padding: '0.5rem 1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              HIGH-RES ARCHIVE
            </button>
          </div>
        </div>

        {/* Viewpoint Navigation Strip */}
        <div
          style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '0.5rem',
            marginBottom: '1.5rem',
            paddingBottom: '0.5rem',
          }}
        >
          {viewpoints.map((vp, idx) => (
            <button
              key={vp.id || idx}
              type="button"
              onClick={() => setActiveTourIndex(idx)}
              style={{
                background: activeTourIndex === idx ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)',
                color: activeTourIndex === idx ? 'var(--accent-orange)' : 'var(--text-secondary)',
                border: '1px solid',
                borderColor: activeTourIndex === idx ? 'var(--accent-orange)' : 'var(--border-steel)',
                padding: '0.75rem 1.25rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span style={{ color: activeTourIndex === idx ? 'var(--accent-orange)' : 'var(--text-muted)' }}>
                0{idx + 1}.
              </span>
              <span>{vp.title.toUpperCase()}</span>
            </button>
          ))}
        </div>

        {/* 3D WebGL / Photo Tour Canvas Viewport */}
        <div style={{ border: '1px solid var(--border-steel)', position: 'relative', height: '560px', overflow: 'hidden' }}>
          <RestaurantTour />
        </div>

        {/* Viewpoint Spec Sheet Banner Below */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-steel)',
            borderTop: 'none',
            padding: '1.5rem 2rem',
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              SPACE CLASSIFICATION
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, marginTop: '0.2rem' }}>
              {current.space_name}
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              MATERIAL SPECIFICATIONS
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-orange)', marginTop: '0.2rem' }}>
              {current.materials_spec}
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              ARCHITECTURAL NARRATIVE
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              {current.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

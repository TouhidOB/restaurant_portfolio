import React from 'react';
import { useCMS } from '../../context/CMSContext';
import RestaurantTour from '../three/RestaurantTour';

export default function TourSection() {
  const {
    content,
    activeTourIndex,
    setActiveTourIndex,
    tourMode,
    setTourMode,
    openReservation,
  } = useCMS();

  const tourSection = content?.sections?.virtual_tour || {};
  const viewpoints = content?.viewpoints || [];
  const currentViewpoint = viewpoints[activeTourIndex] || viewpoints[0] || {};

  return (
    <section id="tour" className="section-shell">
      <div className="container-tropical">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
            marginBottom: '2.5rem',
          }}
        >
          <div style={{ maxWidth: '780px' }}>
            <span className="section-tag">
              {tourSection.eyebrow || 'VIRTUAL EXPLORATION'}
            </span>
            <h2 className="section-heading">
              {tourSection.title || 'TAKE A MOMENT. STEP INSIDE.'}
            </h2>
            <p className="section-lead">
              {tourSection.subtitle ||
                'Explore our restaurant’s spaces and discover the details that make the dining experience unique.'}
            </p>
          </div>

          {/* Mode Switcher (3D vs Photo Archive) */}
          <div
            style={{
              display: 'inline-flex',
              padding: '0.35rem',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-botanical)',
              borderRadius: 'var(--radius-sm)',
              gap: '0.35rem',
            }}
          >
            <button
              onClick={() => setTourMode('3d')}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                letterSpacing: '0.04em',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: tourMode === '3d' ? 'var(--accent-terracotta)' : 'transparent',
                color: tourMode === '3d' ? '#FFFFFF' : 'var(--text-sand)',
                transition: 'all var(--transition-fast)',
              }}
            >
              3D SPATIAL MODEL
            </button>
            <button
              onClick={() => setTourMode('photo')}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                letterSpacing: '0.04em',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: tourMode === 'photo' ? 'var(--accent-terracotta)' : 'transparent',
                color: tourMode === 'photo' ? '#FFFFFF' : 'var(--text-sand)',
                transition: 'all var(--transition-fast)',
              }}
            >
              PHOTO ARCHIVE
            </button>
          </div>
        </div>

        {/* Viewpoints Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            overflowX: 'auto',
            paddingBottom: '1rem',
            marginBottom: '1.75rem',
            scrollbarWidth: 'none',
          }}
        >
          {viewpoints.map((vp, idx) => (
            <button
              key={vp.id || vp.slug}
              onClick={() => setActiveTourIndex(idx)}
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.85rem',
                fontWeight: 600,
                padding: '0.75rem 1.25rem',
                borderRadius: 'var(--radius-sm)',
                border: activeTourIndex === idx ? '1px solid var(--accent-citrus)' : '1px solid var(--border-botanical)',
                backgroundColor: activeTourIndex === idx ? 'rgba(217, 184, 78, 0.15)' : 'var(--bg-surface)',
                color: activeTourIndex === idx ? 'var(--accent-citrus)' : 'var(--text-sand)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all var(--transition-fast)',
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', opacity: 0.8 }}>
                0{idx + 1}
              </span>
              <span>{vp.title}</span>
            </button>
          ))}
        </div>

        {/* 3D / Photo Viewport Container */}
        <div
          style={{
            position: 'relative',
            height: 'clamp(440px, 60vh, 680px)',
            width: '100%',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            border: '1px solid var(--border-light)',
            boxShadow: '0 24px 64px rgba(0, 0, 0, 0.5)',
            marginBottom: '2rem',
            backgroundColor: '#122019',
          }}
        >
          {tourMode === '3d' ? (
            <RestaurantTour />
          ) : (
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <img
                src={currentViewpoint.image_url || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80'}
                alt={currentViewpoint.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(26, 47, 37, 0.9) 0%, transparent 60%)',
                }}
              />
            </div>
          )}

          {/* Overlay Viewpoint Title Pill */}
          <div
            style={{
              position: 'absolute',
              top: '1.25rem',
              left: '1.25rem',
              zIndex: 10,
              backgroundColor: 'rgba(26, 47, 37, 0.85)',
              backdropFilter: 'blur(8px)',
              border: '1px solid var(--border-botanical)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.65rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-citrus)',
                boxShadow: '0 0 8px var(--accent-citrus)',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                letterSpacing: '0.06em',
                color: 'var(--text-ivory)',
                textTransform: 'uppercase',
              }}
            >
              ZONE: {currentViewpoint.space_name || currentViewpoint.title}
            </span>
          </div>
        </div>

        {/* Viewpoint Spatial Info Card */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-botanical)',
            borderRadius: 'var(--radius-md)',
            padding: '2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            alignItems: 'center',
          }}
        >
          <div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--accent-terracotta)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '0.4rem',
              }}
            >
              SPATIAL ATTRIBUTES & ARCHITECTURE
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.85rem',
                color: 'var(--text-ivory)',
                marginBottom: '0.65rem',
              }}
            >
              {currentViewpoint.title}
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                color: 'var(--text-sand)',
                lineHeight: 1.6,
              }}
            >
              {currentViewpoint.description}
            </p>
          </div>

          <div
            style={{
              padding: '1.25rem',
              backgroundColor: 'var(--bg-forest-deep)',
              border: '1px solid var(--border-botanical)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--sage-mist)',
                display: 'block',
                marginBottom: '0.25rem',
              }}
            >
              SPECIFICATION & MATERIALS
            </span>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                color: 'var(--text-ivory)',
                marginBottom: '0.85rem',
              }}
            >
              {currentViewpoint.materials_spec || 'Reclaimed teak beams, honed coral stone, water features'}
            </p>
            {currentViewpoint.hotspot_title && (
              <div
                style={{
                  padding: '0.65rem 0.85rem',
                  backgroundColor: 'rgba(188, 113, 83, 0.15)',
                  border: '1px solid var(--accent-terracotta)',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-terracotta)', display: 'block' }}>
                  HOTSPOT: {currentViewpoint.hotspot_title}
                </strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-sand)' }}>
                  {currentViewpoint.hotspot_detail}
                </span>
              </div>
            )}
          </div>

          <div style={{ textAlign: 'right' }}>
            <button
              onClick={openReservation}
              className="btn-terracotta"
              style={{ width: '100%', padding: '0.9rem 1.5rem', fontSize: '0.9rem' }}
            >
              <span>RESERVE TABLE IN THIS SPACE</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

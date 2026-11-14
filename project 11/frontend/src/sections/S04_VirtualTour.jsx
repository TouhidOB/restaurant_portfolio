import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import RestaurantTour from '../components/three/RestaurantTour';

export default function S04_VirtualTour() {
  const { content, openReservation } = useCMS();
  const vt = content?.virtual_tour || {};
  const viewpoints = vt.viewpoints || [];

  const [activeIndex, setActiveIndex] = useState(0);
  const currentView = viewpoints[activeIndex] || viewpoints[0] || {};
  const currentDetails = currentView.details || [];

  return (
    <section
      id="tour"
      aria-label="Interactive Glasshouse Virtual Tour"
      style={{
        padding: '110px 0',
        backgroundColor: '#1A2B24',
        color: '#F4F0E6',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 50px auto' }}>
          <div
            style={{
              display: 'inline-block',
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-sage, #A6B5A0)',
              fontWeight: 700,
              marginBottom: '12px',
            }}
          >
            {vt.subtitle || 'EXPLORE OUR SPACES'}
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 4.5vw, 46px)',
              fontWeight: 600,
              color: '#FFFFFF',
              lineHeight: 1.2,
              marginBottom: '16px',
            }}
          >
            {vt.title || 'Interactive Glasshouse Virtual Exploration'}
          </h2>
          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.7,
              color: 'rgba(244, 240, 230, 0.82)',
              margin: '0 auto',
            }}
          >
            {vt.description || 'Navigate five distinct architectural zones of Verdant Atrium in full cinematic 3D.'}
          </p>
        </div>

        {/* 3D WebGL Virtual Tour Canvas */}
        {viewpoints.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <RestaurantTour
              viewpoints={viewpoints}
              activeIndex={activeIndex}
              onSelectViewpoint={(idx) => setActiveIndex(idx)}
            />
          </div>
        )}

        {/* Viewpoint Architectural Specs Bar */}
        {currentView && (
          <div
            style={{
              backgroundColor: 'rgba(38, 63, 53, 0.65)',
              border: '1px solid rgba(166, 181, 160, 0.3)',
              borderRadius: '3px',
              padding: '24px 30px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
            }}
          >
            <div style={{ maxWidth: '640px' }}>
              <div
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--color-copper, #A87958)',
                  fontWeight: 600,
                  marginBottom: '8px',
                }}
              >
                Architectural Specifications & Materiality
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {currentDetails.map((detail, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: '12px',
                      padding: '5px 12px',
                      backgroundColor: 'rgba(26, 43, 36, 0.6)',
                      border: '1px solid rgba(166, 181, 160, 0.25)',
                      borderRadius: '2px',
                      color: '#FAF7F0',
                    }}
                  >
                    ✓ {detail}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => openReservation(currentView.name)}
              style={{
                padding: '12px 24px',
                backgroundColor: 'var(--color-copper, #A87958)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '2px',
                fontSize: '12px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#8c5f42')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-copper, #A87958)')}
            >
              Reserve In This Space
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

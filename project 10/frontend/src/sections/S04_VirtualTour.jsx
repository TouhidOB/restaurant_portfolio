import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import RestaurantTour from '../components/three/RestaurantTour';

export default function S04_VirtualTour() {
  const { content, t, lang, openReservation } = useCMS();
  const vt = content?.virtualTour || {};

  const subtitle = t(vt.subtitle) || 'Explore The Five Spaces';
  const title = t(vt.title) || 'Interactive Heritage Virtual Tour';
  const description = t(vt.description) || 'Navigate our contemporary Bengali dining house across 5 distinct architectural viewpoints in full 3D.';
  const viewpoints = vt.viewpoints || [];

  const [activeIndex, setActiveIndex] = useState(0);
  const currentView = viewpoints[activeIndex] || viewpoints[0] || {};
  const currentDetails = currentView.details || [];

  return (
    <section
      id="tour"
      aria-label="Interactive Restaurant Tour"
      style={{
        padding: '110px 0',
        backgroundColor: '#1d2533',
        color: 'var(--color-bg-ivory, #F4EBDD)',
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
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-brass, #B18A54)',
              fontWeight: 700,
              marginBottom: '12px',
            }}
          >
            {subtitle}
          </div>
          <h2
            style={{
              fontFamily: lang === 'bn' ? 'var(--font-bengali-display)' : 'var(--font-display)',
              fontSize: 'clamp(32px, 4.5vw, 46px)',
              fontWeight: 600,
              color: '#FFFFFF',
              lineHeight: 1.2,
              marginBottom: '16px',
            }}
          >
            {title}
          </h2>
          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.7,
              color: 'rgba(244, 235, 221, 0.8)',
              margin: '0 auto',
            }}
          >
            {description}
          </p>
        </div>

        {/* 3D WebGL Virtual Tour Canvas */}
        {viewpoints.length > 0 && (
          <div style={{ marginBottom: '36px' }}>
            <RestaurantTour
              viewpoints={viewpoints}
              activeIndex={activeIndex}
              onSelectViewpoint={(idx) => setActiveIndex(idx)}
            />
          </div>
        )}

        {/* Viewpoint Architectural Details Bar */}
        {currentView && (
          <div
            style={{
              backgroundColor: 'rgba(24, 33, 46, 0.85)',
              border: '1px solid rgba(177, 138, 84, 0.3)',
              borderRadius: '3px',
              padding: '24px 30px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
            }}
          >
            <div style={{ maxWidth: '600px' }}>
              <div
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--color-brass, #B18A54)',
                  fontWeight: 600,
                  marginBottom: '6px',
                }}
              >
                {lang === 'bn' ? 'স্থাপত্য বিশদ ও উপাদান' : 'Architectural Specs & Materials'}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {currentDetails.map((detail, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: '12px',
                      padding: '5px 12px',
                      backgroundColor: 'rgba(166, 83, 59, 0.2)',
                      border: '1px solid rgba(177, 138, 84, 0.35)',
                      borderRadius: '2px',
                      color: '#F4EBDD',
                    }}
                  >
                    ✓ {t(detail)}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => openReservation(currentView.id)}
              style={{
                padding: '12px 24px',
                backgroundColor: 'var(--color-terracotta, #A6533B)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '2px',
                fontSize: '12.5px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#8c422d')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-terracotta, #A6533B)')}
            >
              {lang === 'bn' ? 'এই স্থানে টেবিল সংরক্ষণ করুন' : 'Reserve In This Space'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

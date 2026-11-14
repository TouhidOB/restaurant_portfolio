import React from 'react';
import { useCMS } from '../context/CMSContext';
import RestaurantTour from '../components/three/RestaurantTour';
import { Sparkles, Box, Compass } from 'lucide-react';

export default function S04_VirtualTour() {
  const { data, activeViewpointIndex, setActiveViewpointIndex } = useCMS();
  const viewpoints = data.viewpoints || [];

  return (
    <section
      id="tour"
      style={{
        backgroundColor: '#090A0E',
        padding: '110px 24px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative'
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px'
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto' }}>
          <div className="pill-badge" style={{ marginBottom: '16px', color: '#CCFF00', borderColor: 'rgba(204, 255, 0, 0.25)' }}>
            CHAPTER 02 // 3D SPATIAL EXPLORATION
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              lineHeight: 1.05,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-1px',
              margin: '0 0 16px 0'
            }}
          >
            STEP INSIDE THE POP STUDIO.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              lineHeight: 1.6,
              color: '#9FA5B7',
              margin: 0
            }}
          >
            Explore our architectural spaces in realtime 3D WebGL. Switch viewpoints, inspect interactive hotspots, and toggle lighting moods from Day Studio to Cyber Midnight.
          </p>
        </div>

        {/* 3D WebGL Tour Component */}
        <RestaurantTour />

        {/* Viewpoint Info Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '16px',
            marginTop: '8px'
          }}
        >
          {viewpoints.map((vp, idx) => {
            const isSelected = idx === activeViewpointIndex;
            return (
              <div
                key={vp.id || idx}
                onClick={() => setActiveViewpointIndex(idx)}
                style={{
                  backgroundColor: isSelected ? 'rgba(204, 255, 0, 0.05)' : '#12141D',
                  border: isSelected ? '1px solid #CCFF00' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '20px',
                  boxShadow: isSelected ? '0 0 20px rgba(204, 255, 0, 0.15)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      fontWeight: 800,
                      backgroundColor: isSelected ? '#CCFF00' : 'rgba(255, 255, 255, 0.06)',
                      color: isSelected ? '#0A0B0E' : '#9FA5B7',
                      padding: '2px 8px',
                      borderRadius: '999px'
                    }}
                  >
                    0{idx + 1}
                  </span>
                  {isSelected && (
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9px',
                        fontWeight: 700,
                        color: '#CCFF00',
                        letterSpacing: '0.5px'
                      }}
                    >
                      ● ACTIVE NODE
                    </span>
                  )}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#FFF',
                    margin: '0 0 6px 0',
                    lineHeight: 1.3
                  }}
                >
                  {vp.name}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12.5px',
                    lineHeight: 1.5,
                    color: '#8E94A5',
                    margin: 0
                  }}
                >
                  {vp.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

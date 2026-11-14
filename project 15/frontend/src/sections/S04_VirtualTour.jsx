import React from 'react';
import { useCMS } from '../context/CMSContext';
import RestaurantTour from '../components/three/RestaurantTour';
import { Compass, Sparkles, Box, Camera, MapPin } from 'lucide-react';

export default function S04_VirtualTour() {
  const { data, activeViewpointIndex, setActiveViewpointIndex } = useCMS();
  const viewpoints = data.viewpoints || [];

  return (
    <section
      id="tour"
      style={{
        backgroundColor: '#FFF5E6',
        padding: '100px 24px',
        borderBottom: '4px solid #171717',
        position: 'relative'
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '36px'
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-block',
              backgroundColor: '#F04438',
              color: '#FFF',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 800,
              padding: '6px 16px',
              borderRadius: '999px',
              border: '2px solid #171717',
              boxShadow: '3px 3px 0 #171717',
              marginBottom: '16px',
              textTransform: 'uppercase'
            }}
          >
            CHAPTER 02 // 3D VIRTUAL TOUR
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              lineHeight: 1.05,
              color: '#171717',
              margin: '0 0 16px 0',
              textShadow: '3px 3px 0 #FFD928'
            }}
          >
            STEP INSIDE THE POP STUDIO.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.15rem',
              lineHeight: 1.6,
              color: '#444',
              margin: 0
            }}
          >
            Explore our architectural spaces in realtime 3D WebGL. Switch viewpoints, inspect interactive hotspots, and toggle lighting moods from Day Studio to Midnight Neon.
          </p>
        </div>

        {/* 3D WebGL Tour Component */}
        <RestaurantTour />

        {/* Viewpoint Info Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px',
            marginTop: '12px'
          }}
        >
          {viewpoints.map((vp, idx) => {
            const isSelected = idx === activeViewpointIndex;
            return (
              <div
                key={vp.id || idx}
                onClick={() => setActiveViewpointIndex(idx)}
                style={{
                  backgroundColor: isSelected ? '#FFD928' : '#FFF',
                  border: '3px solid #171717',
                  borderRadius: '16px',
                  padding: '18px',
                  boxShadow: isSelected ? '5px 5px 0 #F04438' : '3px 3px 0 #171717',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      backgroundColor: '#171717',
                      color: '#FFF',
                      padding: '2px 8px',
                      borderRadius: '4px'
                    }}
                  >
                    0{idx + 1}
                  </span>
                  {isSelected && (
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        color: '#F04438'
                      }}
                    >
                      ● ACTIVE VIEW
                    </span>
                  )}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.1rem',
                    color: '#171717',
                    margin: '0 0 8px 0',
                    lineHeight: 1.2
                  }}
                >
                  {vp.name}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    lineHeight: 1.45,
                    color: '#555',
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

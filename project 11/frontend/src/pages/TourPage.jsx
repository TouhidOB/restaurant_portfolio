import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import RestaurantTour from '../components/three/RestaurantTour';

export default function TourPage({ onNavigate }) {
  const { content, openReservation } = useCMS();
  const vt = content?.virtual_tour || {};
  const viewpoints = vt.viewpoints || [
    {
      id: 'atrium',
      label: 'Grand Botanical Atrium',
      tag: 'Sunlight Vault & Fern Canopy',
      description: 'The core atrium showcases 12-meter soaring glass roofs, living vertical walls with over 80 rare tropical species, and natural travertine pavers bathed in filtered Oregon sunlight.',
      details: ['Living moss walls', 'Custom brass fixtures', 'Circadian daylight tracking'],
    },
    {
      id: 'bar',
      label: 'The Terroir Espresso Bar',
      tag: 'Craft Extraction & Botanical Distillations',
      description: 'Hand-crafted Oregon white oak counter wrapping around custom matte olive Synesso MVP Hydra espresso machinery and cold-brew botanical infusion towers.',
      details: ['Synesso MVP Hydra in Sage', 'Single-origin cupping bar', 'Cold botanical drip columns'],
    },
    {
      id: 'mezzanine',
      label: 'Canopy Mezzanine & Roastery',
      tag: 'High Canopy Seating & Tasting Library',
      description: 'An elevated wooden loft surrounded by the upper foliage of mature fiddle-leaf figs, bird-of-paradise, and hanging orchids, with viewports into our micro-lot roasting lab.',
      details: ['Micro-lot cupping tables', 'Foliage canopy vantage', 'Curated botanical library'],
    },
    {
      id: 'courtyard',
      label: 'The Pergola Glass Courtyard',
      tag: 'Private Dining & Herbary',
      description: 'A secluded heated glass conservatory annex lined with heirloom culinary herbs, citrus trees, and custom banquettes for private afternoon teas and dinners.',
      details: ['Heated terrazzo floors', 'Fresh culinary herb perimeter', 'Dedicated sommelier & barista service'],
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const currentView = viewpoints[activeIndex] || viewpoints[0] || {};
  const currentDetails = currentView.details || [];

  return (
    <div style={{ backgroundColor: '#1A2B24', color: '#F4F0E6', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(38, 63, 53, 0.5) 0%, #1A2B24 100%)',
          padding: '4.5rem 1.5rem 3rem',
          textAlign: 'center',
          borderBottom: '1px solid rgba(166, 181, 160, 0.25)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span
            style={{
              color: '#A87958',
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              display: 'inline-block',
              marginBottom: '0.75rem',
            }}
          >
            {vt.subtitle || 'SPATIAL ARCHITECTURE & 3D TOUR'}
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display, "Cormorant Garamond")',
              fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
              letterSpacing: '0.03em',
              color: '#F4F0E6',
              margin: '0.6rem 0 1rem',
            }}
          >
            {vt.title || 'Interactive Glasshouse Virtual Exploration'}
          </h1>
          <div style={{ width: '80px', height: '2px', background: '#A87958', margin: '1rem auto' }} />
          <p style={{ color: '#D8D2C5', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1rem' }}>
            {vt.description || 'Traverse our sun-drenched biophilic conservatory. Experience the harmony of structural glass, soaring flora canopy, and artisan coffee architecture.'}
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '50px 24px 80px' }}>
        {/* Viewpoint Selector Tabs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '40px',
          }}
        >
          {viewpoints.map((vp, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={vp.id || idx}
                onClick={() => setActiveIndex(idx)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '3px',
                  backgroundColor: isActive ? '#A87958' : 'rgba(38, 63, 53, 0.6)',
                  color: isActive ? '#FFFFFF' : '#A6B5A0',
                  border: `1px solid ${isActive ? '#A87958' : 'rgba(166, 181, 160, 0.3)'}`,
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  textTransform: 'uppercase',
                }}
              >
                {vp.label}
              </button>
            );
          })}
        </div>

        {/* 3D Spatial Canvas Viewport */}
        <div
          style={{
            height: '520px',
            backgroundColor: '#15241E',
            borderRadius: '4px',
            overflow: 'hidden',
            border: '1px solid rgba(166, 181, 160, 0.3)',
            boxShadow: '0 30px 70px rgba(0, 0, 0, 0.5)',
            position: 'relative',
            marginBottom: '40px',
          }}
        >
          <RestaurantTour activeViewpoint={currentView.id || 'atrium'} />

          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              backgroundColor: 'rgba(26, 43, 36, 0.85)',
              backdropFilter: 'blur(8px)',
              padding: '10px 18px',
              borderRadius: '3px',
              border: '1px solid rgba(166, 181, 160, 0.3)',
            }}
          >
            <span style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A87958', display: 'block', fontWeight: 700 }}>
              VIEWPOINT ACTIVE
            </span>
            <strong style={{ fontSize: '15px', color: '#F4F0E6' }}>{currentView.label}</strong>
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              backgroundColor: 'rgba(26, 43, 36, 0.85)',
              backdropFilter: 'blur(8px)',
              padding: '8px 16px',
              borderRadius: '3px',
              border: '1px solid rgba(166, 181, 160, 0.25)',
              fontSize: '11px',
              letterSpacing: '0.08em',
              color: '#A6B5A0',
            }}
          >
            3D WebGL Architectural Environment • Drag to inspect
          </div>
        </div>

        {/* Viewpoint Details Card */}
        <div
          style={{
            backgroundColor: '#263F35',
            padding: '40px',
            borderRadius: '4px',
            border: '1px solid rgba(166, 181, 160, 0.25)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px',
            alignItems: 'center',
          }}
        >
          <div>
            <span style={{ color: '#A87958', fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              {currentView.tag || 'SPATIAL HIGHLIGHT'}
            </span>
            <h3 style={{ fontFamily: 'var(--font-display, "Cormorant Garamond")', fontSize: '2rem', color: '#FFFFFF', margin: '8px 0 16px' }}>
              {currentView.label}
            </h3>
            <p style={{ color: '#D8D2C5', fontSize: '1rem', lineHeight: 1.7, margin: 0 }}>
              {currentView.description}
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A6B5A0', marginBottom: '14px' }}>
              ARCHITECTURAL SPECIFICATIONS
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {currentDetails.map((det, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#F4F0E6', fontSize: '14px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#A87958', flexShrink: 0 }} />
                  <span>{det}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '24px' }}>
              <button
                onClick={() => openReservation()}
                style={{
                  padding: '12px 28px',
                  backgroundColor: '#A87958',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '3px',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                }}
              >
                Reserve Table In This Zone
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

export default function TourPage({ onNavigate }) {
  const { content, openReservationModal, openReservation } = useCMS();
  const triggerReservation = openReservation || openReservationModal;
  const tourSection = content?.editorial_sections?.s04_tour || {};
  const viewpoints = content?.tour_viewpoints || [
    {
      id: 1,
      title: "Villa Exterior & Limestone Facade",
      slug: "exterior",
      subtitle: "The 1928 cliffside estate viewed from the Mediterranean approach",
      description: "Hand-hewn Provençal limestone and ancient terracotta roof tiles rise above the azure sea, surrounded by towering cypress and umbrella pines.",
      camera_position: "[0, 3.5, 9.5]",
      atmosphere: "Morning Light • Crisp Sea Salt Breeze",
      highlights: ["Century-old olive grove", "Natural sea-cliff foundations", "Grand arched portico"],
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85"
    },
    {
      id: 2,
      title: "Sunlit Terracotta Courtyard",
      slug: "courtyard",
      subtitle: "The serene heart of arrival with bubbling marble fountain",
      description: "Shaded by climbing bougainvillea and mature citrus trees, this quiet sanctuary transitions guests from the bustle of the world into coastal stillness.",
      camera_position: "[-2.5, 2.0, 3.5]",
      atmosphere: "Dappled Sunlight • Fragrant Jasmine & Rosemary",
      highlights: ["Hand-carved marble fountain", "Tuscan terracotta pavers", "Heirloom citrus trees"],
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85"
    },
    {
      id: 3,
      title: "Grand Dining Salon & Colonnade",
      slug: "salon",
      subtitle: "Double-height stone vaults framing panoramic azure water",
      description: "Restored French limestone arches and patinated bronze fixtures frame floor-to-ceiling sea views, offering climate-perfect dining across all seasons.",
      camera_position: "[0, 2.2, 4.0]",
      atmosphere: "Gentle Coastal Breeze • Acoustically Softened Stone",
      highlights: ["Historic barrel vaults", "Custom olive wood tables", "Acoustic limestone treatment"],
      image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=85"
    },
    {
      id: 4,
      title: "Panoramic Cliffside Terrace",
      slug: "terrace",
      subtitle: "Al fresco dining suspended between sky, rock, and waves",
      description: "Our signature dining platform overlooks the bay toward Monaco, where guests dine beneath canopy awnings as the sun sets over the Cap.",
      camera_position: "[3.0, 2.5, 5.0]",
      atmosphere: "Golden Hour Glow • Sound of Crashing Waves",
      highlights: ["Unobstructed 270° sea horizon", "Candlelit evening service", "Direct sea breeze"],
      image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=85"
    },
    {
      id: 5,
      title: "Subterranean Rock Wine Vault",
      slug: "cellar",
      subtitle: "480+ historic vintages carved directly into coastal limestone",
      description: "Dating back to the villa's 1928 foundation, this naturally humid, temperature-stable cellar holds rare Provençal, Bordeaux, and Piedmont treasures.",
      camera_position: "[0, 1.8, 3.0]",
      atmosphere: "Cool Cave Air • Faint Aroma of French Oak",
      highlights: ["Natural limestone insulation", "Private sommelier tasting table", "Rare vertical collections"],
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=85"
    }
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const currentViewpoint = viewpoints[activeIdx] || viewpoints[0];

  return (
    <div style={{ backgroundColor: '#18252E', color: '#F7F3EA', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(38, 58, 72, 0.65) 0%, #18252E 100%)',
          padding: '5rem 1.5rem',
          textAlign: 'center',
          borderBottom: '1px solid rgba(233, 223, 207, 0.2)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span
            style={{
              color: '#B96F4F',
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              display: 'inline-block',
              marginBottom: '0.75rem',
            }}
          >
            {tourSection.badge || 'VIRTUAL EXPLORATION'}
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display, "Cormorant Garamond")',
              fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
              letterSpacing: '0.03em',
              color: '#F7F3EA',
              margin: '0.6rem 0 1.25rem',
            }}
          >
            {tourSection.title || '3D WebGL Villa Experience'}
          </h1>
          <div style={{ width: '80px', height: '2px', background: '#B96F4F', margin: '1rem auto' }} />
          <p style={{ color: '#E9DFCF', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1.25rem' }}>
            {tourSection.description || 'Traverse the sunlit terracotta courtyard, double-height dining colonnade, and panoramic cliffside terrace from anywhere in the world.'}
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1180px', margin: '4rem auto 6rem', padding: '0 1.5rem' }}>
        {/* Viewpoint Navigation Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.6rem',
            justifyContent: 'center',
            marginBottom: '3rem',
          }}
        >
          {viewpoints.map((vp, idx) => (
            <button
              key={vp.id || idx}
              onClick={() => setActiveIdx(idx)}
              style={{
                padding: '10px 22px',
                borderRadius: '4px',
                border: activeIdx === idx ? '1px solid #B96F4F' : '1px solid rgba(233, 223, 207, 0.2)',
                backgroundColor: activeIdx === idx ? '#B96F4F' : '#263A48',
                color: activeIdx === idx ? '#FFFFFF' : '#E9DFCF',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              {vp.title}
            </button>
          ))}
        </div>

        {/* Viewpoint Stage */}
        <div
          style={{
            backgroundColor: '#263A48',
            borderRadius: '8px',
            border: '1px solid rgba(233, 223, 207, 0.2)',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          }}
        >
          {/* Visual Canvas Representation */}
          <div style={{ position: 'relative', minHeight: '420px', backgroundColor: '#18252E' }}>
            <img
              src={
                currentViewpoint.image ||
                'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85'
              }
              alt={currentViewpoint.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.85,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '1.25rem',
                left: '1.25rem',
                backgroundColor: 'rgba(24, 37, 46, 0.85)',
                backdropFilter: 'blur(6px)',
                padding: '6px 14px',
                borderRadius: '4px',
                border: '1px solid rgba(185, 111, 79, 0.5)',
                color: '#F7F3EA',
                fontSize: '0.78rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              WebGL Perspective: {currentViewpoint.slug}
            </div>

            <div
              style={{
                position: 'absolute',
                bottom: '1.25rem',
                left: '1.25rem',
                right: '1.25rem',
                backgroundColor: 'rgba(24, 37, 46, 0.9)',
                backdropFilter: 'blur(8px)',
                padding: '10px 16px',
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.78rem',
                color: '#A9BDB5',
              }}
            >
              <span>{currentViewpoint.atmosphere}</span>
              <span style={{ fontFamily: 'monospace', color: '#E9DFCF' }}>
                Pos: {currentViewpoint.camera_position}
              </span>
            </div>
          </div>

          {/* Viewpoint Narrative */}
          <div style={{ padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span
              style={{
                color: '#B96F4F',
                fontSize: '0.78rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '0.5rem',
              }}
            >
              {currentViewpoint.subtitle}
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display, "Cormorant Garamond")',
                fontSize: '2.2rem',
                color: '#F7F3EA',
                marginBottom: '1.25rem',
                lineHeight: 1.2,
              }}
            >
              {currentViewpoint.title}
            </h2>
            <p
              style={{
                color: '#E9DFCF',
                fontSize: '1rem',
                lineHeight: 1.7,
                marginBottom: '1.75rem',
              }}
            >
              {currentViewpoint.description}
            </p>

            {currentViewpoint.highlights && (
              <div style={{ marginBottom: '2.5rem' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    color: '#A9BDB5',
                    letterSpacing: '0.08em',
                    display: 'block',
                    marginBottom: '0.6rem',
                    fontWeight: 600,
                  }}
                >
                  Spatial Attributes
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {currentViewpoint.highlights.map((h, i) => (
                    <span
                      key={i}
                      style={{
                        backgroundColor: '#18252E',
                        color: '#E9DFCF',
                        border: '1px solid rgba(233, 223, 207, 0.15)',
                        padding: '4px 12px',
                        borderRadius: '3px',
                        fontSize: '0.8rem',
                      }}
                    >
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <button
                onClick={triggerReservation}
                style={{
                  backgroundColor: '#B96F4F',
                  color: '#FFFFFF',
                  padding: '12px 28px',
                  borderRadius: '3px',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                Reserve in this Zone
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

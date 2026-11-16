import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

export default function TourPage({ onNavigate }) {
  const { content, openReservationModal, openReservation } = useCMS();
  const triggerReservation = openReservation || openReservationModal;

  const tourSection = content?.editorial_sections?.s04_tour || {};
  const viewpoints = content?.tour_viewpoints || [
    {
      id: 1,
      title: "Neon Storefront at Midnight",
      slug: "storefront",
      subtitle: "Glowing magenta and cyan signage in the heart of Hongdae",
      description: "Step into our late-night dining world. Walk along the wet neon-lit street alley where aromatic clouds of steam rise from sizzling woks.",
      camera_position: "[0, 2.5, 7.0]",
      atmosphere: "Neon glow, rain-slicked pavement reflections, muffled K-hip hop beats",
      highlights: ["Giant Glowing Pocha Lantern", "Wet Concrete Alleyway", "Steaming Wok Vents"],
      image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 2,
      title: "Main Pocha Dining Salon",
      slug: "salon",
      subtitle: "Classic round stainless steel tables and vibrant neon fixtures",
      description: "Surrounded by retro posters and glowing neon signage, guests sit elbow-to-elbow sharing sizzling plates of tteokbokki and fried chicken.",
      camera_position: "[-2.0, 1.8, 3.2]",
      atmosphere: "Clinking soju glasses, sizzling platters, warm neon buzz",
      highlights: ["Stainless Steel Drum Tables", "Orange Plastic Pocha Stools", "Custom Neon Wall Murals"],
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 3,
      title: "High Heat Open Wok Station",
      slug: "kitchen",
      subtitle: "Wok hei flames flash as noodles and seafood sear at 400°C",
      description: "Front-row seats to our culinary engine. Watch our brigade toss carbon steel woks with synchronized speed and intense focus.",
      camera_position: "[1.8, 2.0, 2.5]",
      atmosphere: "Wok flame flashes, steam clouds, sizzling oil sounds",
      highlights: ["Live Fire Wok Station", "Double-Basket Fryers", "Copper Braising Pans"],
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 4,
      title: "Late Night Soju Table Spread",
      slug: "experience",
      subtitle: "Soju table spread with sizzling anju and fried chicken",
      description: "A close-up view of the ultimate late-night feast: bubbly spicy stew, golden garlic chicken, kimbap rolls, and frosted glasses of soju.",
      camera_position: "[0, 1.5, 3.4]",
      atmosphere: "Intimate foodie spotlight, steam rising, frosted drinks",
      highlights: ["Cast-Iron Sizzle Plate", "Crisp Amber Glow", "Condiment Caddy"],
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const currentViewpoint = viewpoints[activeIdx] || viewpoints[0];

  return (
    <div style={{ backgroundColor: '#111316', color: '#F6F4F0', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(27, 29, 34, 0.9) 0%, #111316 100%)',
          padding: '5rem 1.5rem',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255, 46, 136, 0.25)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span
            style={{
              color: '#FF2E88',
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              display: 'inline-block',
              marginBottom: '0.75rem',
              fontFamily: 'var(--font-condensed)',
            }}
          >
            {tourSection.badge || '3D INTERACTIVE WEBGL VIRTUAL TOUR'}
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
              color: '#FFFFFF',
              margin: '0.6rem 0 0.5rem',
              fontWeight: 800,
            }}
          >
            {tourSection.title || 'Traverse the Seoul Street Pocha'}
          </h1>
          <div style={{ width: '80px', height: '2px', background: '#FF2E88', margin: '1rem auto' }} />
          <p style={{ color: '#B6BAC2', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1.25rem' }}>
            {tourSection.description || 'Step into our late-night dining world. Walk along the wet neon-lit street alley, pull up a plastic pocha stool, or stand before our roaring open kitchen woks.'}
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1200px', margin: '4rem auto 6rem', padding: '0 1.5rem' }}>
        {/* Viewpoint Navigation Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center', marginBottom: '3rem' }}>
          {viewpoints.map((vp, idx) => (
            <button
              key={vp.id || idx}
              onClick={() => setActiveIdx(idx)}
              style={{
                padding: '10px 22px',
                borderRadius: '4px',
                border: activeIdx === idx ? '1px solid #FF2E88' : '1px solid rgba(246, 244, 240, 0.15)',
                backgroundColor: activeIdx === idx ? '#FF2E88' : '#1B1D22',
                color: activeIdx === idx ? '#FFFFFF' : '#B6BAC2',
                fontWeight: 700,
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
            backgroundColor: '#1B1D22',
            borderRadius: '8px',
            border: '1px solid rgba(255, 46, 136, 0.3)',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          }}
        >
          {/* Visual Canvas Representation */}
          <div style={{ position: 'relative', minHeight: '440px', backgroundColor: '#111316' }}>
            <img
              src={currentViewpoint.image || 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80'}
              alt={currentViewpoint.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.88 }}
            />
            <div
              style={{
                position: 'absolute',
                top: '1.25rem',
                left: '1.25rem',
                backgroundColor: 'rgba(17, 19, 22, 0.85)',
                backdropFilter: 'blur(6px)',
                padding: '6px 14px',
                borderRadius: '4px',
                border: '1px solid #FF2E88',
                color: '#21D4E8',
                fontSize: '0.78rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-condensed)',
                fontWeight: 700,
              }}
            >
              WebGL Viewpoint: {currentViewpoint.slug}
            </div>

            <div
              style={{
                position: 'absolute',
                bottom: '1.25rem',
                left: '1.25rem',
                right: '1.25rem',
                backgroundColor: 'rgba(17, 19, 22, 0.92)',
                backdropFilter: 'blur(8px)',
                padding: '10px 16px',
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.78rem',
                color: '#B6BAC2',
              }}
            >
              <span>{currentViewpoint.atmosphere}</span>
              <span style={{ fontFamily: 'monospace', color: '#21D4E8' }}>Pos: {currentViewpoint.camera_position}</span>
            </div>
          </div>

          {/* Viewpoint Narrative */}
          <div style={{ padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ color: '#FF2E88', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: 'var(--font-condensed)', marginBottom: '0.5rem' }}>
              {currentViewpoint.subtitle}
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: '#FFFFFF', marginBottom: '1.25rem', lineHeight: 1.2 }}>
              {currentViewpoint.title}
            </h2>
            <p style={{ color: '#B6BAC2', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.75rem' }}>
              {currentViewpoint.description}
            </p>

            {currentViewpoint.highlights && (
              <div style={{ marginBottom: '2.5rem' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#21D4E8', letterSpacing: '0.08em', display: 'block', marginBottom: '0.6rem', fontWeight: 700, fontFamily: 'var(--font-condensed)' }}>
                  Spatial Attributes
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {currentViewpoint.highlights.map((h, i) => (
                    <span
                      key={i}
                      style={{
                        backgroundColor: '#111316',
                        color: '#F6F4F0',
                        border: '1px solid rgba(246, 244, 240, 0.15)',
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
                  backgroundColor: '#FF2E88',
                  color: '#FFFFFF',
                  padding: '12px 28px',
                  borderRadius: '4px',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  boxShadow: '0 0 16px rgba(255, 46, 136, 0.4)',
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

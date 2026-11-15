import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Compass, Sparkles, Sun, Moon, Eye, Calendar } from 'lucide-react';

export default function TourPage() {
  const {
    viewpoints,
    activeTourIndex,
    setActiveTourIndex,
    currentViewpoint,
    tourLightingMode,
    setTourLightingMode,
    openReservation,
  } = useCMS();

  return (
    <div style={{ paddingTop: '100px', backgroundColor: '#FCFBF8', minHeight: '100vh', color: '#1C2022' }}>
      {/* Header */}
      <section style={{ padding: '60px 0 50px', background: 'linear-gradient(180deg, #F5F2EA 0%, #FCFBF8 100%)', borderBottom: '1px solid #E2DAD0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', background: 'rgba(197, 160, 89, 0.15)', border: '1px solid rgba(197, 160, 89, 0.4)', color: '#9E7B36', fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, marginBottom: '16px' }}>
            <Compass size={13} />
            <span>Interactive Spatial Architecture</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', color: '#081721', lineHeight: 1.15, marginBottom: '18px', fontWeight: 600 }}>
            3D Spatial Virtual Tour
          </h1>

          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#5C6366', maxWidth: '700px', margin: '0 auto 24px' }}>
            Immerse yourself in our cliffside estate through high-resolution spatial viewpoints, architectural hotspots, and shifting Mediterranean lighting modes.
          </p>

          {/* Lighting Mode Selector */}
          <div style={{ display: 'inline-flex', gap: '8px', background: '#FFFFFF', padding: '6px', borderRadius: '30px', border: '1px solid #E2DAD0', boxShadow: '0 4px 15px rgba(0,0,0,0.04)' }}>
            <button
              onClick={() => setTourLightingMode('day')}
              style={{
                padding: '6px 16px',
                borderRadius: '20px',
                border: 'none',
                background: tourLightingMode === 'day' ? '#C5A059' : 'transparent',
                color: tourLightingMode === 'day' ? '#FFFFFF' : '#5C6366',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '11.5px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Sun size={13} /> Day Service
            </button>
            <button
              onClick={() => setTourLightingMode('golden')}
              style={{
                padding: '6px 16px',
                borderRadius: '20px',
                border: 'none',
                background: tourLightingMode === 'golden' ? '#C5A059' : 'transparent',
                color: tourLightingMode === 'golden' ? '#FFFFFF' : '#5C6366',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '11.5px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Sparkles size={13} /> Golden Hour Sunset
            </button>
            <button
              onClick={() => setTourLightingMode('dusk')}
              style={{
                padding: '6px 16px',
                borderRadius: '20px',
                border: 'none',
                background: tourLightingMode === 'dusk' ? '#081721' : 'transparent',
                color: tourLightingMode === 'dusk' ? '#E0C184' : '#5C6366',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '11.5px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Moon size={13} /> Starlit Twilight
            </button>
          </div>
        </div>
      </section>

      {/* Main Tour Showcase Canvas */}
      <section style={{ padding: '40px 0 80px' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          {/* Active Viewport */}
          <div style={{ position: 'relative', height: '560px', borderRadius: '16px', overflow: 'hidden', border: '1px solid #E2DAD0', boxShadow: '0 15px 40px rgba(8, 23, 33, 0.1)', marginBottom: '30px' }}>
            <img
              src={currentViewpoint?.image_url || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80'}
              alt={currentViewpoint?.title || 'Tour Viewpoint'}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />

            {/* Viewpoint Info Overlay */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '36px 40px', background: 'linear-gradient(180deg, transparent 0%, rgba(8, 23, 33, 0.92) 100%)', color: '#FFFFFF' }}>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', color: '#DFBA73', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>
                🏛️ {currentViewpoint?.space_name || 'Amalfi Sanctuary'}
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2.4rem', margin: '6px 0 10px', color: '#FFFFFF' }}>
                {currentViewpoint?.title}
              </h2>
              <p style={{ fontSize: '1rem', color: '#D5E5EB', maxWidth: '750px', margin: '0 0 16px', lineHeight: 1.6 }}>
                {currentViewpoint?.description || currentViewpoint?.architectural_details}
              </p>

              <button onClick={openReservation} className="btn-gold" style={{ padding: '10px 24px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer' }}>
                <Calendar size={14} style={{ marginRight: '6px', display: 'inline' }} />
                Reserve Table In This Space
              </button>
            </div>
          </div>

          {/* Viewpoints Thumbnails Strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {viewpoints.map((vp, idx) => (
              <div
                key={vp.id || idx}
                onClick={() => setActiveTourIndex(idx)}
                style={{
                  background: activeTourIndex === idx ? '#FAF8F4' : '#FFFFFF',
                  borderRadius: '10px',
                  border: activeTourIndex === idx ? '2px solid #C5A059' : '1px solid #E2DAD0',
                  padding: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: activeTourIndex === idx ? '0 4px 15px rgba(197, 160, 89, 0.2)' : 'none',
                }}
              >
                <div style={{ height: '110px', borderRadius: '6px', overflow: 'hidden', marginBottom: '8px' }}>
                  <img
                    src={vp.image_url || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'}
                    alt={vp.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono, monospace)', color: '#2A6F85', textTransform: 'uppercase', fontWeight: 700 }}>
                  Point 0{idx + 1}
                </div>
                <div style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.05rem', color: '#081721', fontWeight: 600, marginTop: '2px' }}>
                  {vp.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

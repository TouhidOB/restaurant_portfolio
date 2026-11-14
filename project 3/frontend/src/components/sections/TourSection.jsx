import React from 'react';
import { Sun, Sunset, Moon, Eye, Image as ImageIcon, MapPin, Calendar, Sparkles } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import RestaurantTour from '../three/RestaurantTour';

export default function TourSection() {
  const {
    data,
    viewpoints,
    activeTourIndex,
    setActiveTourIndex,
    currentViewpoint,
    tourLightingMode,
    setTourLightingMode,
    tourDisplayMode,
    setTourDisplayMode,
    setIsReservationModalOpen,
  } = useCMS();

  const section = data.sections?.tour || {};

  return (
    <section id="tour" className="section-wrapper" style={{ backgroundColor: '#F4EFE6' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            {section.badge || 'SPATIAL EXPERIENCE'}
          </div>
          <h2 className="section-title">
            {section.title || 'INTERACTIVE 3D VIRTUAL TOUR'}
          </h2>
          <p className="section-subtitle">
            {section.subtitle || 'Step inside our cliffside sanctuary through real-time 3D navigation across our arrival portal, arches, dining terrace, and hearth.'}
          </p>
        </div>

        {/* Control Toolbar */}
        <div
          style={{
            background: '#FAF9F5',
            border: '1px solid #D8CCB8',
            borderRadius: '16px',
            padding: '16px 20px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            boxShadow: '0 4px 15px rgba(23, 74, 99, 0.04)',
          }}
        >
          {/* Viewpoint Navigation Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {viewpoints.map((vp, idx) => (
              <button
                key={vp.slug || idx}
                onClick={() => setActiveTourIndex(idx)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  background: activeTourIndex === idx ? '#174A63' : '#FAF9F5',
                  color: activeTourIndex === idx ? '#FFFFFF' : '#174A63',
                  border: activeTourIndex === idx ? '1px solid #174A63' : '1px solid #D8CCB8',
                }}
              >
                0{idx + 1}. {vp.title}
              </button>
            ))}
          </div>

          {/* Lighting & Display Mode Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            {/* Lighting Modes */}
            <div style={{ display: 'flex', background: '#EFEAE0', borderRadius: '20px', padding: '3px' }}>
              <button
                onClick={() => setTourLightingMode('day')}
                title="Crisp Sunlight (Day)"
                style={{
                  padding: '6px 12px',
                  borderRadius: '16px',
                  fontSize: '11px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: tourLightingMode === 'day' ? '#FFFFFF' : 'transparent',
                  color: tourLightingMode === 'day' ? '#174A63' : '#8C8981',
                  fontWeight: 600,
                }}
              >
                <Sun size={13} color="#D6A854" />
                <span>Day</span>
              </button>
              <button
                onClick={() => setTourLightingMode('golden')}
                title="Sunset Amber (Golden Hour)"
                style={{
                  padding: '6px 12px',
                  borderRadius: '16px',
                  fontSize: '11px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: tourLightingMode === 'golden' ? '#FFFFFF' : 'transparent',
                  color: tourLightingMode === 'golden' ? '#174A63' : '#8C8981',
                  fontWeight: 600,
                }}
              >
                <Sunset size={13} color="#B86E50" />
                <span>Golden</span>
              </button>
              <button
                onClick={() => setTourLightingMode('dusk')}
                title="Aegean Twilight (Dusk)"
                style={{
                  padding: '6px 12px',
                  borderRadius: '16px',
                  fontSize: '11px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: tourLightingMode === 'dusk' ? '#FFFFFF' : 'transparent',
                  color: tourLightingMode === 'dusk' ? '#174A63' : '#8C8981',
                  fontWeight: 600,
                }}
              >
                <Moon size={13} color="#174A63" />
                <span>Dusk</span>
              </button>
            </div>

            {/* Display Mode Toggle */}
            <div style={{ display: 'flex', background: '#EFEAE0', borderRadius: '20px', padding: '3px' }}>
              <button
                onClick={() => setTourDisplayMode('3d')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '16px',
                  fontSize: '11px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: tourDisplayMode === '3d' ? '#174A63' : 'transparent',
                  color: tourDisplayMode === '3d' ? '#FFFFFF' : '#8C8981',
                  fontWeight: 600,
                }}
              >
                <Eye size={13} />
                <span>3D WebGL</span>
              </button>
              <button
                onClick={() => setTourDisplayMode('photo')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '16px',
                  fontSize: '11px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: tourDisplayMode === 'photo' ? '#174A63' : 'transparent',
                  color: tourDisplayMode === 'photo' ? '#FFFFFF' : '#8C8981',
                  fontWeight: 600,
                }}
              >
                <ImageIcon size={13} />
                <span>Photo</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3D Canvas Stage Container */}
        <div
          style={{
            position: 'relative',
            height: '560px',
            width: '100%',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid #D8CCB8',
            boxShadow: '0 15px 45px rgba(23, 74, 99, 0.08)',
            background: '#E9F1F4',
            marginBottom: '28px',
          }}
        >
          <RestaurantTour />

          {/* Floating Spatial Badge */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              background: 'rgba(250, 249, 245, 0.92)',
              backdropFilter: 'blur(8px)',
              padding: '8px 16px',
              borderRadius: '20px',
              border: '1px solid #D8CCB8',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: '#174A63',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Sparkles size={13} color="#D6A854" />
            <span>VIEWPOINT 0{activeTourIndex + 1} OF 05</span>
          </div>
        </div>

        {/* Viewpoint Info Card */}
        {currentViewpoint && (
          <div
            className="luxury-card"
            style={{
              padding: '32px 36px',
              background: '#FFFFFF',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px',
              alignItems: 'center',
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: '#367E94',
                  display: 'block',
                  marginBottom: '6px',
                }}
              >
                {currentViewpoint.space_name}
              </span>
              <h3 style={{ fontSize: '2rem', color: '#174A63', marginBottom: '8px' }}>
                {currentViewpoint.title}
              </h3>
              <p style={{ fontSize: '1rem', color: '#8C8981', fontStyle: 'italic', marginBottom: '12px' }}>
                {currentViewpoint.subtitle}
              </p>
              <p style={{ fontSize: '1rem', color: '#4A4E4D', lineHeight: 1.6 }}>
                {currentViewpoint.description}
              </p>
            </div>

            <div style={{ borderLeft: '1px solid #EDE7DC', paddingLeft: '28px' }}>
              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#174A63', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '4px' }}>
                  Architectural Materials
                </span>
                <p style={{ fontSize: '0.9rem', color: '#68765A', lineHeight: 1.5 }}>
                  {currentViewpoint.architectural_details || 'Hand-hewn porous limestone walls and natural lime plaster.'}
                </p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#174A63', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '4px' }}>
                  Hotspot Feature
                </span>
                <p style={{ fontSize: '0.9rem', color: '#174A63', fontWeight: 500 }}>
                  <strong>{currentViewpoint.hotspot_title}:</strong> {currentViewpoint.hotspot_description}
                </p>
              </div>

              <button
                onClick={() => setIsReservationModalOpen(true)}
                className="btn-primary"
                style={{ padding: '12px 24px', fontSize: '0.85rem' }}
              >
                <Calendar size={14} />
                <span>Reserve Table in This Space</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

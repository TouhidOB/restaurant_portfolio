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
    <section id="tour" className="section-wrapper" style={{ backgroundColor: '#F6F4EE' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            {section.badge || 'SPATIAL EXPERIENCE'}
          </div>
          <h2 className="section-title">
            Interactive 3D <em>Virtual Tour</em>
          </h2>
          <p className="section-subtitle">
            {section.subtitle || 'Step inside our cliffside sanctuary through real-time 3D navigation across our arrival portal, arches, dining terrace, and hearth.'}
          </p>
        </div>

        {/* Control Toolbar */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid rgba(197, 160, 89, 0.35)',
            borderRadius: '20px',
            padding: '18px 24px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '18px',
            boxShadow: '0 8px 25px rgba(8, 23, 33, 0.04)',
          }}
        >
          {/* Viewpoint Navigation Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {viewpoints.map((vp, idx) => (
              <button
                key={vp.slug || idx}
                onClick={() => setActiveTourIndex(idx)}
                style={{
                  padding: '9px 18px',
                  borderRadius: '30px',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  transition: 'all 0.25s',
                  background: activeTourIndex === idx ? 'var(--grad-gold)' : 'transparent',
                  color: activeTourIndex === idx ? '#081721' : '#1C2022',
                  border: activeTourIndex === idx ? '1px solid #C5A059' : '1px solid #E5DDCF',
                  fontWeight: activeTourIndex === idx ? 700 : 500,
                  boxShadow: activeTourIndex === idx ? '0 4px 15px rgba(197, 160, 89, 0.3)' : 'none',
                }}
              >
                0{idx + 1}. {vp.title}
              </button>
            ))}
          </div>

          {/* Lighting & Display Mode Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            {/* Lighting Modes */}
            <div style={{ display: 'flex', background: '#F0ECE4', borderRadius: '30px', padding: '3px', border: '1px solid #E0D8CB' }}>
              <button
                onClick={() => setTourLightingMode('day')}
                title="Crisp Sunlight (Day)"
                style={{
                  padding: '7px 14px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  background: tourLightingMode === 'day' ? '#FFFFFF' : 'transparent',
                  color: tourLightingMode === 'day' ? '#081721' : '#7A7E80',
                  fontWeight: 600,
                  boxShadow: tourLightingMode === 'day' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                }}
              >
                <Sun size={13} color="#C5A059" />
                <span>Day</span>
              </button>
              <button
                onClick={() => setTourLightingMode('golden')}
                title="Sunset Amber (Golden Hour)"
                style={{
                  padding: '7px 14px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  background: tourLightingMode === 'golden' ? '#FFFFFF' : 'transparent',
                  color: tourLightingMode === 'golden' ? '#081721' : '#7A7E80',
                  fontWeight: 600,
                  boxShadow: tourLightingMode === 'golden' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                }}
              >
                <Sunset size={13} color="#B65A3D" />
                <span>Golden</span>
              </button>
              <button
                onClick={() => setTourLightingMode('dusk')}
                title="Aegean Twilight (Dusk)"
                style={{
                  padding: '7px 14px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  background: tourLightingMode === 'dusk' ? '#FFFFFF' : 'transparent',
                  color: tourLightingMode === 'dusk' ? '#081721' : '#7A7E80',
                  fontWeight: 600,
                  boxShadow: tourLightingMode === 'dusk' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                }}
              >
                <Moon size={13} color="#2A6F85" />
                <span>Dusk</span>
              </button>
            </div>

            {/* Display Mode Toggle */}
            <div style={{ display: 'flex', background: '#F0ECE4', borderRadius: '30px', padding: '3px', border: '1px solid #E0D8CB' }}>
              <button
                onClick={() => setTourDisplayMode('3d')}
                style={{
                  padding: '7px 14px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  background: tourDisplayMode === '3d' ? '#081721' : 'transparent',
                  color: tourDisplayMode === '3d' ? '#DFBA73' : '#7A7E80',
                  fontWeight: 600,
                }}
              >
                <Eye size={13} />
                <span>3D Canvas</span>
              </button>
              <button
                onClick={() => setTourDisplayMode('photo')}
                style={{
                  padding: '7px 14px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  background: tourDisplayMode === 'photo' ? '#081721' : 'transparent',
                  color: tourDisplayMode === 'photo' ? '#DFBA73' : '#7A7E80',
                  fontWeight: 600,
                }}
              >
                <ImageIcon size={13} />
                <span>Photo</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3D Canvas Stage */}
        <div
          style={{
            position: 'relative',
            height: '580px',
            width: '100%',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1px solid rgba(197, 160, 89, 0.45)',
            boxShadow: '0 20px 60px rgba(8, 23, 33, 0.1)',
            background: 'linear-gradient(180deg, #E6F0F4 0%, #D8E7EE 100%)',
            marginBottom: '32px',
          }}
        >
          <RestaurantTour />

          {/* Floating Spatial Badge */}
          <div
            style={{
              position: 'absolute',
              top: '22px',
              left: '22px',
              background: 'rgba(252, 251, 248, 0.94)',
              backdropFilter: 'blur(10px)',
              padding: '8px 18px',
              borderRadius: '30px',
              border: '1px solid rgba(197, 160, 89, 0.4)',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: '#081721',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Sparkles size={13} color="#C5A059" />
            <span>VIEWPOINT 0{activeTourIndex + 1} OF 05</span>
          </div>
        </div>

        {/* Viewpoint Info Card */}
        {currentViewpoint && (
          <div
            className="luxury-card"
            style={{
              padding: '36px 42px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '36px',
              alignItems: 'center',
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: '#C5A059',
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 600,
                }}
              >
                {currentViewpoint.space_name}
              </span>
              <h3 style={{ fontSize: '2.2rem', color: '#081721', marginBottom: '8px' }}>
                {currentViewpoint.title}
              </h3>
              <p style={{ fontSize: '1.05rem', color: '#7A7E80', fontStyle: 'italic', marginBottom: '14px' }}>
                {currentViewpoint.subtitle}
              </p>
              <p style={{ fontSize: '1.05rem', color: '#4A5255', lineHeight: 1.7 }}>
                {currentViewpoint.description}
              </p>
            </div>

            <div style={{ borderLeft: '1px solid rgba(197, 160, 89, 0.25)', paddingLeft: '32px' }}>
              <div style={{ marginBottom: '18px' }}>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#C5A059', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }}>
                  Architectural Materials
                </span>
                <p style={{ fontSize: '0.95rem', color: '#253B2F', lineHeight: 1.6 }}>
                  {currentViewpoint.architectural_details || 'Hand-hewn porous limestone walls and natural lime plaster.'}
                </p>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#C5A059', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }}>
                  Curated Spatial Hotspot
                </span>
                <p style={{ fontSize: '0.95rem', color: '#081721', fontWeight: 500 }}>
                  <strong>{currentViewpoint.hotspot_title}:</strong> {currentViewpoint.hotspot_description}
                </p>
              </div>

              <button
                onClick={() => setIsReservationModalOpen(true)}
                className="btn-gold"
                style={{ padding: '13px 28px', fontSize: '0.85rem' }}
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

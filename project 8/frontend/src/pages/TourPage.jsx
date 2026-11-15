import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import RestaurantTour from '../components/three/RestaurantTour';

export default function TourPage() {
  const { content, openReservation } = useCMS();
  const tour = content?.virtualTour || {};
  const viewpoints = tour.viewpoints || [];
  const [activeIdx, setActiveIdx] = useState(0);

  const currentViewpoint = viewpoints[activeIdx] || viewpoints[0];

  return (
    <div style={{ backgroundColor: '#111314', color: 'var(--color-offwhite, #F1EEE7)', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(145, 77, 55, 0.4) 0%, #111314 100%)',
          padding: '5rem 1.5rem',
          textAlign: 'center',
          borderBottom: '2px solid var(--color-brick, #914D37)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span className="section-label">{tour.subtitle || 'Explore The Five Spaces'}</span>
          <h1 style={{ fontFamily: 'var(--font-display, Oswald)', fontSize: '3.5rem', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '1.25rem' }}>
            {tour.title || 'Restaurant Virtual Tour'}
          </h1>
          <p style={{ color: 'var(--color-concrete, #B7B4AC)', fontSize: '1.15rem', lineHeight: '1.7' }}>
            Navigate our converted 1924 locomotive foundry in interactive 3D, from the street-level masonry entrance to the roaring 14-foot open wood hearth.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1150px', margin: '4rem auto', padding: '0 1.5rem' }}>
        {/* 3D Canvas Tour */}
        {viewpoints.length > 0 && (
          <div style={{ marginBottom: '4rem' }}>
            <RestaurantTour
              viewpoints={viewpoints}
              activeIndex={activeIdx}
              onChangeViewpoint={(idx) => setActiveIdx(idx)}
            />
          </div>
        )}

        {/* Viewpoints Detailed Grid */}
        <div style={{ marginTop: '3rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label">Architectural Waypoints</span>
            <h2 style={{ fontFamily: 'var(--font-display, Oswald)', fontSize: '2.4rem', textTransform: 'uppercase' }}>
              The Five Industrial Zones
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {viewpoints.map((vp, idx) => (
              <div
                key={vp.id || idx}
                onClick={() => setActiveIdx(idx)}
                style={{
                  backgroundColor: activeIdx === idx ? 'var(--color-graphite, #252729)' : 'var(--color-black-card, #181A1C)',
                  border: activeIdx === idx ? '2px solid var(--color-copper, #B87345)' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '2px',
                  padding: '2rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontFamily: 'var(--font-display, Oswald)', fontSize: '1.8rem', color: 'var(--color-copper, #B87345)', fontWeight: 800 }}>
                    {vp.number || `0${idx + 1}`}
                  </span>
                  {activeIdx === idx && (
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'var(--color-brick, #914D37)', color: '#FFF', padding: '0.2rem 0.6rem', borderRadius: '2px', fontWeight: 700 }}>
                      Active Camera
                    </span>
                  )}
                </div>

                <h3 style={{ fontFamily: 'var(--font-display, Oswald)', fontSize: '1.35rem', textTransform: 'uppercase', color: 'var(--color-offwhite, #F1EEE7)', marginBottom: '0.75rem' }}>
                  {vp.name}
                </h3>

                <p style={{ color: 'var(--color-concrete, #B7B4AC)', fontSize: '0.9rem', lineHeight: '1.65', marginBottom: '1.25rem' }}>
                  {vp.description}
                </p>

                {vp.details && (
                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '0.85rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {vp.details.map((detail, dIdx) => (
                      <span key={dIdx} style={{ fontSize: '0.75rem', color: 'var(--color-copper, #B87345)', background: 'rgba(184, 115, 69, 0.1)', padding: '0.2rem 0.5rem', borderRadius: '2px' }}>
                        ✦ {detail}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '5rem', padding: '3rem', backgroundColor: 'var(--color-black-card, #181A1C)', border: '1px solid var(--color-brick, #914D37)' }}>
          <h3 style={{ fontFamily: 'var(--font-display, Oswald)', fontSize: '2rem', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Ready To Experience The Atmosphere Live?
          </h3>
          <p style={{ color: 'var(--color-concrete, #B7B4AC)', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Book a front-row seat at the pitmaster counter or reserve a communal table in the main dining hall.
          </p>
          <button onClick={() => openReservation()} className="btn-primary" style={{ padding: '0.85rem 2rem' }}>
            Reserve A Table
          </button>
        </div>
      </div>
    </div>
  );
}

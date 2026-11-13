import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Compass, Eye } from 'lucide-react';

export default function RestaurantTour({ viewpoints }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!viewpoints || viewpoints.length === 0) return null;

  const currentView = viewpoints[activeIndex] || viewpoints[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? viewpoints.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === viewpoints.length - 1 ? 0 : prev + 1));
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '620px', backgroundColor: '#1A1C1B', overflow: 'hidden', borderRadius: '2px' }}>
      {/* Background Architectural Canvas / Image with smooth transition */}
      <div
        key={currentView.id}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(32,35,33,0.2) 0%, rgba(20,22,21,0.85) 100%), url(${currentView.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          animation: 'zenFadeIn 0.8s ease-out',
        }}
      />

      <style>{`
        @keyframes zenFadeIn {
          from { opacity: 0.3; transform: scale(1.02); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Top Bar Indicator */}
      <div
        style={{
          position: 'absolute',
          top: '28px',
          left: '32px',
          right: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="zen-seal">景</span>
          <span style={{ fontSize: '12px', letterSpacing: '0.18em', color: 'var(--color-rice-paper)', textTransform: 'uppercase', fontWeight: 600 }}>
            3D Architectural Tour &bull; Space {currentView.number} of {viewpoints.length}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handlePrev}
            aria-label="Previous Viewpoint"
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'rgba(32, 35, 33, 0.75)',
              border: '1px solid rgba(242, 239, 230, 0.25)',
              color: 'var(--color-rice-paper)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              borderRadius: '2px',
              transition: 'all 0.2s ease',
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Viewpoint"
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'rgba(32, 35, 33, 0.75)',
              border: '1px solid rgba(242, 239, 230, 0.25)',
              color: 'var(--color-rice-paper)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              borderRadius: '2px',
              transition: 'all 0.2s ease',
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Bottom Information Card & Viewpoint Pills */}
      <div
        style={{
          position: 'absolute',
          bottom: '28px',
          left: '32px',
          right: '32px',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {/* Active Viewpoint Details */}
        <div
          style={{
            maxWidth: '560px',
            backgroundColor: 'rgba(32, 35, 33, 0.88)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(182, 161, 123, 0.3)',
            padding: '24px 28px',
            borderRadius: '2px',
            color: 'var(--color-rice-paper)',
          }}
        >
          <div style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-bamboo)', marginBottom: '4px' }}>
            {currentView.caption}
          </div>
          <h3 style={{ fontSize: '26px', color: '#FFFFFF', marginBottom: '8px', fontWeight: 500 }}>
            {currentView.name}
          </h3>
          <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#C9C6BC' }}>
            {currentView.description}
          </p>
        </div>

        {/* Viewpoint Track Selector */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {viewpoints.map((vp, idx) => (
            <button
              key={vp.id}
              onClick={() => setActiveIndex(idx)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                backgroundColor: activeIndex === idx ? 'var(--color-rice-paper)' : 'rgba(32, 35, 33, 0.8)',
                color: activeIndex === idx ? 'var(--color-charcoal)' : '#BBB',
                border: activeIndex === idx ? '1px solid var(--color-bamboo)' : '1px solid rgba(255,255,255,0.15)',
                borderRadius: '2px',
                fontSize: '11px',
                letterSpacing: '0.08em',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
              }}
            >
              <span>{vp.number}</span>
              <span>{vp.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

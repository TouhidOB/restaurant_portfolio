import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

export default function TourPage() {
  const { content, lang, t, openReservation } = useCMS();
  const tour = content?.virtualTour || {};
  const viewpoints = tour.viewpoints || [];
  const [activeIdx, setActiveIdx] = useState(0);

  const activePoint = viewpoints[activeIdx] || viewpoints[0] || {};

  return (
    <div style={{ backgroundColor: '#1A2536', color: '#F4EBDD', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(166, 83, 59, 0.25) 0%, #1A2536 100%)',
          padding: '5rem 1.5rem',
          textAlign: 'center',
          borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span
            style={{
              color: '#D4AF37',
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              display: 'inline-block',
              marginBottom: '0.75rem',
            }}
          >
            {t(tour.subtitle) || (lang === 'bn' ? 'পাঁচটি নান্দনিক স্পেস অন্বেষণ করুন' : 'Explore The Five Spaces')}
          </span>
          <h1
            style={{
              fontFamily: lang === 'bn' ? 'var(--font-display-bn, "Noto Serif Bengali")' : 'var(--font-display-en, "Cormorant Garamond")',
              fontSize: '3.5rem',
              letterSpacing: '0.04em',
              color: '#F4EBDD',
              margin: '0.8rem 0 1.25rem',
            }}
          >
            {t(tour.title) || (lang === 'bn' ? 'ইন্টারেক্টিভ রেস্তোরাঁ ভার্চুয়াল ট্যুর' : 'Interactive Heritage Virtual Tour')}
          </h1>
          <div style={{ width: '80px', height: '2px', background: '#D4AF37', margin: '1rem auto' }} />
          <p style={{ color: '#C8B18D', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1.25rem' }}>
            {t(tour.description) || (lang === 'bn' ? 'সম্পূর্ণ ৩ডি পরিবেশে আমাদের রেস্তোরাঁর ৫টি নান্দনিক স্থাপত্য স্পেস ঘুরে দেখুন।' : 'Navigate our contemporary Bengali dining house across 5 distinct architectural viewpoints in full 3D.')}
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1140px', margin: '4rem auto', padding: '0 1.5rem' }}>
        {/* Viewpoint Selector */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {viewpoints.map((vp, idx) => {
            const active = activeIdx === idx;
            return (
              <button
                key={vp.id || idx}
                onClick={() => setActiveIdx(idx)}
                style={{
                  padding: '0.75rem 1.4rem',
                  backgroundColor: active ? '#A6533B' : '#223046',
                  color: active ? '#F4EBDD' : '#C8B18D',
                  border: active ? '1px solid #D4AF37' : '1px solid rgba(212, 175, 55, 0.2)',
                  borderRadius: '2px',
                  fontFamily: 'inherit',
                  fontSize: '0.88rem',
                  fontWeight: active ? 700 : 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ color: '#D4AF37', fontSize: '0.75rem' }}>{vp.number || `0${idx + 1}`}</span>
                <span>{t(vp.name)}</span>
              </button>
            );
          })}
        </div>

        {/* 3D Viewport Simulation / Showcase Card */}
        <div
          style={{
            backgroundColor: '#223046',
            borderRadius: '4px',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            overflow: 'hidden',
            marginBottom: '4rem',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
          }}
        >
          <div style={{ position: 'relative', height: '520px', backgroundColor: '#141E2D' }}>
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=85"
              alt={t(activePoint.name)}
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
            />
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                backgroundColor: 'rgba(26, 37, 54, 0.9)',
                border: '1px solid #D4AF37',
                padding: '8px 16px',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#536B50', boxShadow: '0 0 6px #536B50' }} />
              <span style={{ color: '#D4AF37', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em' }}>
                SPATIAL VIEWPOINT {activePoint.number || `0${activeIdx + 1}`}
              </span>
            </div>

            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '2.5rem',
                background: 'linear-gradient(to top, rgba(26, 37, 54, 0.98), transparent)',
              }}
            >
              <h2
                style={{
                  fontFamily: lang === 'bn' ? 'var(--font-display-bn, "Noto Serif Bengali")' : 'var(--font-display-en, "Cormorant Garamond")',
                  fontSize: '2.4rem',
                  color: '#F4EBDD',
                  marginBottom: '0.75rem',
                }}
              >
                {t(activePoint.name)}
              </h2>
              <p style={{ color: '#C8B18D', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '750px', marginBottom: '1.5rem' }}>
                {t(activePoint.description)}
              </p>

              {activePoint.details && Array.isArray(activePoint.details) && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {activePoint.details.map((detail, dIdx) => (
                    <span
                      key={dIdx}
                      style={{
                        padding: '4px 12px',
                        backgroundColor: 'rgba(166, 83, 59, 0.25)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        borderRadius: '2px',
                        fontSize: '0.82rem',
                        color: '#D4AF37',
                      }}
                    >
                      &bull; {t(detail)}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* All Viewpoints Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {viewpoints.map((vp, idx) => (
            <div
              key={vp.id || idx}
              onClick={() => setActiveIdx(idx)}
              style={{
                backgroundColor: activeIdx === idx ? 'rgba(166, 83, 59, 0.15)' : '#223046',
                border: activeIdx === idx ? '1px solid #D4AF37' : '1px solid rgba(212, 175, 55, 0.2)',
                borderRadius: '4px',
                padding: '1.75rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ fontSize: '0.8rem', color: '#D4AF37', fontWeight: 800, marginBottom: '0.5rem' }}>
                SPACE {vp.number || `0${idx + 1}`}
              </div>
              <h3 style={{ fontSize: '1.2rem', color: '#F4EBDD', marginBottom: '0.75rem' }}>
                {t(vp.name)}
              </h3>
              <p style={{ color: '#C8B18D', fontSize: '0.86rem', lineHeight: 1.6 }}>
                {t(vp.description)}
              </p>
            </div>
          ))}
        </div>

        {/* Reservation CTA */}
        <div style={{ textAlign: 'center', marginTop: '5rem' }}>
          <button
            onClick={() => openReservation()}
            style={{
              backgroundColor: '#A6533B',
              color: '#F4EBDD',
              border: 'none',
              padding: '1rem 2.5rem',
              fontSize: '0.9rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              borderRadius: '2px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#8c422e')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#A6533B')}
          >
            {lang === 'bn' ? 'এই স্থানে টেবিল সংরক্ষণ করুন' : 'Reserve a Table in this Space'}
          </button>
        </div>
      </div>
    </div>
  );
}

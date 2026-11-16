import React from 'react';
import { useCMS } from '../context/CMSContext';
import { ArrowLeft, Sparkles, Compass } from 'lucide-react';

export default function TourPage({ onNavigate }) {
  const { data, openReservation, openReservationModal, setIsReservationModalOpen } = useCMS();
  const triggerReservation = openReservationModal || openReservation || (() => setIsReservationModalOpen(true));
  const viewpoints = data.viewpoints || [];

  return (
    <div style={{ backgroundColor: '#0A0A0C', color: '#FFF', minHeight: '100vh', paddingTop: '110px', paddingBottom: '90px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Navigation back */}
        <div style={{ marginBottom: '32px' }}>
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('/'); }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#FFDD00',
              textDecoration: 'none',
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 700,
              fontSize: '13px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            <ArrowLeft size={16} /> Back to Studio Home
          </a>
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(0, 229, 255, 0.12)', border: '1px solid rgba(0, 229, 255, 0.3)', color: '#00E5FF', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px' }}>
            <Compass size={13} /> CHAPTER 02 // 3D SPATIAL EXPLORER
          </div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-1px', marginBottom: '16px' }}>
            STEP INSIDE OUR POP-ART UNIVERSE.
          </h1>
          <p style={{ color: '#8E8EA0', fontSize: '16px', lineHeight: 1.6 }}>
            Tour our Arts District dining playground viewpoint by viewpoint: from the glowing neon sign arrival to the live Food Lab plancha counter and high-floor VIP Neon Loft.
          </p>
        </div>

        {/* Viewpoints Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', marginBottom: '60px' }}>
          {viewpoints.map((vp, idx) => (
            <div
              key={vp.id || idx}
              style={{
                background: '#141418',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ height: '220px', position: 'relative' }}>
                <img
                  src={vp.image_url || vp.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'}
                  alt={vp.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(10, 10, 12, 0.85)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255, 221, 0, 0.4)', color: '#FFDD00', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '4px' }}>
                  VIEWPOINT 0{idx + 1}
                </div>
              </div>

              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '20px', fontWeight: 700, color: '#FFF', marginBottom: '4px' }}>
                  {vp.title}
                </h3>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#FF007F', fontWeight: 800, marginBottom: '12px' }}>
                  {vp.subtitle}
                </div>
                <p style={{ color: '#8E8EA0', fontSize: '13px', lineHeight: 1.6, flex: 1 }}>
                  {vp.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Reserve CTA */}
        <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(0, 229, 255, 0.05)', border: '1px dashed #00E5FF', borderRadius: '8px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '24px', marginBottom: '8px' }}>Ready to Take Your Seat?</h2>
          <p style={{ color: '#8E8EA0', fontSize: '14px', marginBottom: '20px' }}>Request your preferred dining area in our booking desk.</p>
          <button
            onClick={() => triggerReservation()}
            style={{ padding: '12px 28px', background: '#00E5FF', color: '#000', border: 'none', borderRadius: '999px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}
          >
            Reserve Table Now &rarr;
          </button>
        </div>

      </div>
    </div>
  );
}

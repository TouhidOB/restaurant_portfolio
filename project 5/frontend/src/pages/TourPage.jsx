import React from 'react';
import TourSection from '../components/sections/TourSection';

export default function TourPage({ onNavigateHome, onOpenReservation }) {
  return (
    <div style={{ paddingTop: 'calc(var(--header-height, 80px) + 2rem)', paddingBottom: '4rem', minHeight: '100vh', backgroundColor: '#1A2F25', color: '#F6F2E9' }}>
      <div className="container-tropical">
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem' }}>
          <button onClick={onNavigateHome} style={{ background: 'none', border: 'none', color: '#AAB9A0', cursor: 'pointer', padding: 0 }}>
            INDEX
          </button>
          <span style={{ color: 'rgba(170, 185, 160, 0.4)' }}>/</span>
          <span style={{ color: '#BC7153' }}>06. 3D SPATIAL EXPLORER</span>
        </div>
      </div>

      <TourSection />

      <div className="container-tropical" style={{ marginTop: '3rem' }}>
        <div style={{ background: '#243F32', border: '1px solid #BC7153', borderRadius: '8px', padding: '3rem 2rem', textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            SELECT YOUR PREFERRED VIEWPOINT
          </h3>
          <p style={{ fontFamily: 'var(--font-sans, sans-serif)', fontSize: '0.95rem', color: '#AAB9A0', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
            Specify your desired table area when booking online or querying our Maître D' desk.
          </p>
          <button
            onClick={onOpenReservation}
            style={{
              padding: '0.85rem 2.2rem',
              background: '#BC7153',
              border: 'none',
              borderRadius: '4px',
              color: '#fff',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            RESERVE IN THIS ZONE &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

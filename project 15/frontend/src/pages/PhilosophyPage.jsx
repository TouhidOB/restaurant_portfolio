import React from 'react';
import { useCMS } from '../context/CMSContext';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function PhilosophyPage({ onNavigate }) {
  const { data, openReservation, openReservationModal, setIsReservationModalOpen } = useCMS();
  const triggerReservation = openReservationModal || openReservation || (() => setIsReservationModalOpen(true));
  const pillars = data.philosophy || [];

  return (
    <div style={{ backgroundColor: '#0A0A0C', color: '#FFF', minHeight: '100vh', paddingTop: '110px', paddingBottom: '90px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        
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

        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(255, 221, 0, 0.12)', border: '1px solid rgba(255, 221, 0, 0.3)', color: '#FFDD00', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px' }}>
            <Sparkles size={13} /> CHAPTER 03 // CULINARY CODE
          </div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-1px', marginBottom: '16px' }}>
            OUR FOOD PHILOSOPHY.
          </h1>
          <p style={{ color: '#8E8EA0', fontSize: '16px', lineHeight: 1.6 }}>
            High-fashion visual aesthetics are only meaningful when supported by serious culinary discipline. Here are the 4 non-negotiable pillars of our food studio.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginBottom: '60px' }}>
          {pillars.map((p) => (
            <div
              key={p.number}
              style={{
                background: '#141418',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderTop: `4px solid ${p.color || '#FFDD00'}`,
                borderRadius: '8px',
                padding: '32px'
              }}
            >
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '24px', fontWeight: 800, color: p.color || '#FFDD00', marginBottom: '16px' }}>
                {p.number}
              </div>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>
                {p.title}
              </h3>
              <p style={{ color: '#8E8EA0', fontSize: '14px', lineHeight: 1.6 }}>
                {p.description}
              </p>
            </div>
          ))}
        </div>

        {/* Reserve CTA */}
        <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(255, 221, 0, 0.05)', border: '1px dashed #FFDD00', borderRadius: '8px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '24px', marginBottom: '8px' }}>Experience Unapologetic Flavor</h2>
          <p style={{ color: '#8E8EA0', fontSize: '14px', marginBottom: '20px' }}>Join us for lunch or dinner in the Arts District.</p>
          <button
            onClick={() => triggerReservation()}
            style={{ padding: '12px 28px', background: '#FFDD00', color: '#000', border: 'none', borderRadius: '999px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}
          >
            Reserve Table Now &rarr;
          </button>
        </div>

      </div>
    </div>
  );
}

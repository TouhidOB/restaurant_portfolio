import React from 'react';
import { useCMS } from '../context/CMSContext';
import { ArrowLeft, Sparkles, Flame, Zap } from 'lucide-react';

export default function KitchenPage({ onNavigate }) {
  const { data, openReservation, openReservationModal, setIsReservationModalOpen } = useCMS();
  const triggerReservation = openReservationModal || openReservation || (() => setIsReservationModalOpen(true));

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

        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(255, 0, 127, 0.12)', border: '1px solid rgba(255, 0, 127, 0.3)', color: '#FF007F', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px' }}>
            <Flame size={13} /> CHAPTER 06 // THE CULINARY LAB
          </div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-1px', marginBottom: '16px' }}>
            THE FOOD LAB & PLANCHA THEATER.
          </h1>
          <p style={{ color: '#8E8EA0', fontSize: '16px', lineHeight: 1.6 }}>
            Our open kitchen is situated dead-center in the dining room. No hidden prep behind doors. Watch high-heat searing, brioche stamping, and molecular cocktail finishing live before your eyes.
          </p>
        </div>

        {/* 3 Tech Pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px', marginBottom: '60px' }}>
          <div style={{ background: '#141418', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '32px' }}>
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '20px', fontWeight: 700, color: '#FFDD00', marginBottom: '10px' }}>
              650°F Mirror Planchas
            </h3>
            <p style={{ color: '#8E8EA0', fontSize: '14px', lineHeight: 1.6 }}>
              Our custom chrome flat-tops achieve blistering surface heat, vaporizing surface moisture in milliseconds to yield the thinnest, crispiest smash burger crust possible.
            </p>
          </div>

          <div style={{ background: '#141418', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '32px' }}>
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '20px', fontWeight: 700, color: '#FF007F', marginBottom: '10px' }}>
              The 18-Sauce Wall
            </h3>
            <p style={{ color: '#8E8EA0', fontSize: '14px', lineHeight: 1.6 }}>
              From fermented habanero pop-mayo to black garlic honey glaze and lacto-dill pickles, our sauce laboratory creates deep layers of acid, sweetness, and heat.
            </p>
          </div>

          <div style={{ background: '#141418', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '32px' }}>
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '20px', fontWeight: 700, color: '#00E5FF', marginBottom: '10px' }}>
              Liquid Nitrogen Finish
            </h3>
            <p style={{ color: '#8E8EA0', fontSize: '14px', lineHeight: 1.6 }}>
              Over-the-top donut stacks and cosmic milkshakes are finished tableside with smoking cloud effects and popping candy textures.
            </p>
          </div>
        </div>

        {/* Reserve CTA */}
        <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(255, 0, 127, 0.05)', border: '1px dashed #FF007F', borderRadius: '8px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '24px', marginBottom: '8px' }}>Book Counter Seating at The Lab</h2>
          <p style={{ color: '#8E8EA0', fontSize: '14px', marginBottom: '20px' }}>Front-row seats to the culinary plancha theater.</p>
          <button
            onClick={() => triggerReservation()}
            style={{ padding: '12px 28px', background: '#FF007F', color: '#FFF', border: 'none', borderRadius: '999px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}
          >
            Reserve Lab Counter &rarr;
          </button>
        </div>

      </div>
    </div>
  );
}

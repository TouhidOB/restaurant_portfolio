import React from 'react';
import { useCMS } from '../context/CMSContext';
import { ArrowLeft, Sparkles, Flame } from 'lucide-react';

export default function FeaturedPage({ onNavigate }) {
  const { data, setSelectedDish, openReservation, openReservationModal, setIsReservationModalOpen } = useCMS();
  const triggerReservation = openReservationModal || openReservation || (() => setIsReservationModalOpen(true));
  const menuItems = data.menu_items || [];
  const featured = menuItems.filter(i => i.is_featured);

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

        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(255, 0, 127, 0.12)', border: '1px solid rgba(255, 0, 127, 0.3)', color: '#FF007F', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px' }}>
            <Sparkles size={13} /> CHAPTER 04 // SIGNATURE POP REPERTOIRE
          </div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-1px', marginBottom: '16px' }}>
            FEATURED STUDIO CREATIONS.
          </h1>
          <p style={{ color: '#8E8EA0', fontSize: '16px', lineHeight: 1.6 }}>
            Our most requested pop smash burgers, theatrical over-the-top shakes, and loaded street eats. Click any dish for recipe insights and wine/cocktail pairing suggestions.
          </p>
        </div>

        {/* Dish Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', marginBottom: '60px' }}>
          {(featured.length ? featured : menuItems.slice(0, 6)).map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedDish(item)}
              style={{
                background: '#141418',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#FFDD00';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                <img
                  src={item.image_url || item.image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80'}
                  alt={item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '12px', right: '12px', background: '#FFDD00', color: '#000', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', fontWeight: 800, padding: '4px 10px', borderRadius: '4px' }}>
                  ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                </div>
              </div>

              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: '#FF007F', fontWeight: 800, marginBottom: '6px' }}>
                  {item.category || 'Pop Dish'}
                </div>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '18px', fontWeight: 700, color: '#FFF', marginBottom: '8px' }}>
                  {item.name}
                </h3>
                <p style={{ color: '#8E8EA0', fontSize: '13px', lineHeight: 1.5, flex: 1, marginBottom: '14px' }}>
                  {item.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <span style={{ fontSize: '11px', color: '#00E5FF', fontWeight: 600 }}>Inspection Detail &rarr;</span>
                  <span style={{ fontSize: '11px', color: '#8E8EA0' }}>{item.prep_time || '10 mins'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Banner */}
        <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(255, 0, 127, 0.05)', border: '1px dashed #FF007F', borderRadius: '8px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '24px', marginBottom: '8px' }}>Taste The Atomic Smash In Person</h2>
          <p style={{ color: '#8E8EA0', fontSize: '14px', marginBottom: '20px' }}>Bookings open up to 30 days in advance.</p>
          <button
            onClick={() => triggerReservation()}
            style={{ padding: '12px 28px', background: '#FF007F', color: '#FFF', border: 'none', borderRadius: '999px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}
          >
            Reserve Table &rarr;
          </button>
        </div>

      </div>
    </div>
  );
}

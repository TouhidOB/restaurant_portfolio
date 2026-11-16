import React from 'react';
import { useCMS } from '../context/CMSContext';
import { ArrowLeft, Sparkles, PartyPopper } from 'lucide-react';

export default function ExperiencesPage({ onNavigate }) {
  const { data, openReservation, openReservationModal, setIsReservationModalOpen } = useCMS();
  const triggerReservation = openReservationModal || openReservation || (() => setIsReservationModalOpen(true));
  const experiences = data.experiences || [];

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
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(255, 0, 127, 0.12)', border: '1px solid rgba(255, 0, 127, 0.3)', color: '#FF007F', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px' }}>
            <PartyPopper size={13} /> CHAPTER 08 // PRIVATE HAPPENINGS & EXPERIENCES
          </div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-1px', marginBottom: '16px' }}>
            VIP NEON EXPERIENCES.
          </h1>
          <p style={{ color: '#8E8EA0', fontSize: '16px', lineHeight: 1.6 }}>
            From private neon loft buyouts with resident vinyl DJs to interactive burger tasting flights and cocktail lab workshops.
          </p>
        </div>

        {/* Experiences Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', marginBottom: '60px' }}>
          {experiences.map((exp, idx) => (
            <div
              key={exp.id || idx}
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
                  src={exp.image_url || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'}
                  alt={exp.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {exp.price_guide && (
                  <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: '#FFDD00', color: '#000', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '4px' }}>
                    {exp.price_guide}
                  </div>
                )}
              </div>

              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#00E5FF', fontWeight: 800, marginBottom: '6px' }}>
                  Capacity: {exp.capacity || 'Up to 50 Guests'}
                </div>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '20px', fontWeight: 700, color: '#FFF', marginBottom: '8px' }}>
                  {exp.title}
                </h3>
                <p style={{ color: '#8E8EA0', fontSize: '13px', lineHeight: 1.6, flex: 1, marginBottom: '20px' }}>
                  {exp.description}
                </p>
                <button
                  onClick={() => triggerReservation()}
                  style={{ padding: '10px 18px', background: 'transparent', border: '1px solid #FFDD00', borderRadius: '4px', color: '#FFDD00', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer', textAlign: 'center' }}
                >
                  Inquire for Booking &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Elementor Link Banner */}
        <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(255, 221, 0, 0.05)', border: '1px dashed #FFDD00', borderRadius: '8px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '24px', marginBottom: '8px' }}>Looking for Full VIP Loft Buyout?</h2>
          <p style={{ color: '#8E8EA0', fontSize: '14px', marginBottom: '20px' }}>Explore our standalone dedicated VIP Neon Loft Experience page.</p>
          <a
            href="/page/pop-art-vip-neon-loft-party"
            onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('/page/pop-art-vip-neon-loft-party'); }}
            style={{ display: 'inline-block', padding: '12px 28px', background: '#FFDD00', color: '#000', borderRadius: '999px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none' }}
          >
            Explore VIP Loft Page &rarr;
          </a>
        </div>

      </div>
    </div>
  );
}

import React from 'react';
import { useCMS } from '../context/CMSContext';
import { MapPin, Navigation, Car, Train, ArrowUpRight } from 'lucide-react';

export default function S14_Location() {
  const { data } = useCMS();
  const config = data.config || {};

  return (
    <section
      id="location"
      style={{
        backgroundColor: '#090A0E',
        padding: '110px 24px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative'
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '50px'
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto' }}>
          <div className="pill-badge" style={{ marginBottom: '16px', color: '#00F0FF', borderColor: 'rgba(0, 240, 255, 0.25)' }}>
            CHAPTER 12 // STUDIO COORDINATES
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              lineHeight: 1.05,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-1px',
              margin: '0 0 16px 0'
            }}
          >
            COME FIND US.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              lineHeight: 1.6,
              color: '#9FA5B7',
              margin: 0
            }}
          >
            Located right in the heart of the Arts District, surrounded by street murals, galleries, and neon signage.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '32px'
          }}
        >
          {/* Column 1: Info Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div
              style={{
                backgroundColor: '#12141D',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '24px',
                padding: '32px',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <MapPin size={20} color="#FF3366" />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, margin: 0, color: '#FFF' }}>
                  STUDIO ADDRESS
                </h3>
              </div>

              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: 1.6, color: '#D4D4D8', margin: '0 0 20px 0' }}>
                {config.address || '742 Evergreen Pop Boulevard, Arts District, Studio City, CA 90210'}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                <div>
                  <span style={{ color: '#646A7E' }}>TEL: </span>
                  <strong style={{ color: '#FFF' }}>{config.phone || '+1 (555) 767-3663'}</strong>
                </div>
                <div>
                  <span style={{ color: '#646A7E' }}>EMAIL: </span>
                  <strong style={{ color: '#FFF' }}>{config.email || 'hello@popfoodstudio.com'}</strong>
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#12141D',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '24px',
                padding: '32px',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <Navigation size={20} color="#0066FF" />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, margin: 0, color: '#FFF' }}>
                  TRANSIT & PARKING
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <Train size={16} color="#CCFF00" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: '#9FA5B7' }}>
                    <strong style={{ color: '#FFF' }}>Metro Red Line:</strong> Exit Arts District / Little Tokyo Station. A brisk 4-minute walk past the gallery murals.
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <Car size={16} color="#FF3366" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: '#9FA5B7' }}>
                    <strong style={{ color: '#FFF' }}>Valet Parking:</strong> Complimentary valet parking for all evening dinner reservations. Metered spots on Evergreen Pop Blvd.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Minimalist Dark Map Card */}
          <div
            style={{
              backgroundColor: '#12141D',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '24px',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)'
            }}
          >
            <div
              style={{
                backgroundColor: '#090A0E',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '18px',
                height: '280px',
                position: 'relative',
                overflow: 'hidden',
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Abstract Road Lines */}
              <div style={{ position: 'absolute', width: '100%', height: '20px', backgroundColor: 'rgba(255,255,255,0.05)', transform: 'rotate(-12deg)' }} />
              <div style={{ position: 'absolute', height: '100%', width: '20px', backgroundColor: 'rgba(255,255,255,0.05)', transform: 'rotate(18deg)' }} />

              {/* Pinpoint Landmark */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  backgroundColor: '#FF3366',
                  color: '#FFF',
                  borderRadius: '16px',
                  padding: '14px 22px',
                  boxShadow: '0 0 30px rgba(255, 51, 102, 0.5)',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700 }}>
                  POP! FOOD STUDIO
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', marginTop: '4px', color: '#FFE4E6' }}>
                  ★ 742 EVERGREEN POP BLVD
                </div>
              </div>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: '#FFF' }}>
                  LIVE NAVIGATION
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#646A7E' }}>
                  Launch in Apple / Google Maps
                </div>
              </div>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: '#FFF',
                  padding: '10px 18px',
                  borderRadius: '999px',
                  fontFamily: 'var(--font-display)',
                  fontSize: '12px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.12)'
                }}
              >
                <span>OPEN MAPS</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

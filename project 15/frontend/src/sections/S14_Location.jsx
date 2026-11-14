import React from 'react';
import { useCMS } from '../context/CMSContext';
import { MapPin, Clock, Phone, Mail, Navigation, Car, Train } from 'lucide-react';

export default function S14_Location() {
  const { data } = useCMS();
  const config = data.config || {};

  return (
    <section
      id="location"
      style={{
        backgroundColor: '#FFF5E6',
        padding: '100px 24px',
        borderBottom: '4px solid #171717',
        position: 'relative'
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '48px'
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-block',
              backgroundColor: '#2455D6',
              color: '#FFF',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 800,
              padding: '6px 16px',
              borderRadius: '999px',
              border: '2px solid #171717',
              boxShadow: '3px 3px 0 #171717',
              marginBottom: '16px',
              textTransform: 'uppercase'
            }}
          >
            CHAPTER 12 // STUDIO COORDINATES
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              lineHeight: 1.05,
              color: '#171717',
              margin: '0 0 16px 0',
              textShadow: '3px 3px 0 #FFD928'
            }}
          >
            COME FIND US.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.15rem',
              lineHeight: 1.6,
              color: '#444',
              margin: 0
            }}
          >
            Located right in the heart of the Arts District, surrounded by street murals, galleries, and neon signage.
          </p>
        </div>

        {/* 2-Column Grid: Location Details + Stylized Comic Map */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '36px',
            alignItems: 'stretch'
          }}
        >
          {/* Column 1: Info Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Address & Hours */}
            <div
              style={{
                backgroundColor: '#FFF',
                border: '4px solid #171717',
                borderRadius: '20px',
                padding: '28px',
                boxShadow: '6px 6px 0 #FFD928'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <MapPin size={24} color="#F04438" />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', margin: 0 }}>
                  THE STUDIO ADDRESS
                </h3>
              </div>

              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', lineHeight: 1.5, color: '#333', margin: '0 0 16px 0' }}>
                {config.address || '742 Evergreen Pop Boulevard, Arts District, Studio City, CA 90210'}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
                <div>
                  <span style={{ color: '#888' }}>TEL: </span>
                  <strong>{config.phone || '+1 (555) 767-3663'}</strong>
                </div>
                <div>
                  <span style={{ color: '#888' }}>EMAIL: </span>
                  <strong>{config.email || 'hello@popfoodstudio.com'}</strong>
                </div>
              </div>
            </div>

            {/* Transit & Parking */}
            <div
              style={{
                backgroundColor: '#FFF',
                border: '4px solid #171717',
                borderRadius: '20px',
                padding: '28px',
                boxShadow: '6px 6px 0 #2455D6'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <Navigation size={24} color="#2455D6" />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', margin: 0 }}>
                  TRANSIT & PARKING
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <Train size={18} color="#00C389" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: '#444' }}>
                    <strong>Metro Red Line:</strong> Exit at Arts District/Little Tokyo Station. A brisk 4-minute walk past the comic murals.
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <Car size={18} color="#F04438" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: '#444' }}>
                    <strong>Valet & Street Parking:</strong> Complimentary valet parking for guests dining at dinner services. Metered street parking available along Evergreen Pop Blvd.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Stylized Pop Map Card */}
          <div
            style={{
              backgroundColor: '#FFD928',
              border: '4px solid #171717',
              borderRadius: '20px',
              padding: '28px',
              boxShadow: '8px 8px 0 #171717',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Pop Map Visual Background */}
            <div
              style={{
                backgroundColor: '#FFF',
                border: '3px solid #171717',
                borderRadius: '16px',
                height: '280px',
                position: 'relative',
                overflow: 'hidden',
                backgroundImage: 'linear-gradient(#E8E8E8 1px, transparent 1px), linear-gradient(90deg, #E8E8E8 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Graphic Roads */}
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '24px',
                  backgroundColor: '#D1D5DB',
                  borderTop: '2px dashed #9CA3AF',
                  borderBottom: '2px dashed #9CA3AF',
                  transform: 'rotate(-15deg)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  height: '100%',
                  width: '24px',
                  backgroundColor: '#D1D5DB',
                  borderLeft: '2px dashed #9CA3AF',
                  borderRight: '2px dashed #9CA3AF',
                  transform: 'rotate(20deg)'
                }}
              />

              {/* Pinpoint Landmark Badge */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  backgroundColor: '#F04438',
                  color: '#FFF',
                  border: '3px solid #171717',
                  borderRadius: '16px',
                  padding: '12px 20px',
                  boxShadow: '4px 4px 0 #171717',
                  textAlign: 'center',
                  transform: 'rotate(-3deg)'
                }}
              >
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', lineHeight: 1 }}>
                  POP! FOOD STUDIO
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginTop: '4px', fontWeight: 700 }}>
                  ★ 742 EVERGREEN POP BLVD
                </div>
              </div>
            </div>

            {/* Bottom Direction CTA */}
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#171717' }}>
                  NEED DIRECTIONS?
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#333' }}>
                  Tap below to launch in Google Maps
                </div>
              </div>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: '#171717',
                  color: '#FFF',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  border: '2px solid #171717',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  boxShadow: '3px 3px 0 #FFF'
                }}
              >
                OPEN IN MAPS →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

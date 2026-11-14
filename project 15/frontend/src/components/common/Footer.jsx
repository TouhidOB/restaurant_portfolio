import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { ArrowUpRight, Heart, Sparkles, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  const { data, setIsReservationModalOpen } = useCMS();
  const config = data.config || {};

  return (
    <footer
      style={{
        backgroundColor: '#171717',
        color: '#FFF5E6',
        borderTop: '5px solid #FFD928',
        padding: '80px 24px 40px 24px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2
        }}
      >
        {/* Top Massive Marquee / Wordmark */}
        <div
          style={{
            borderBottom: '2px solid rgba(255, 245, 230, 0.2)',
            paddingBottom: '40px',
            marginBottom: '60px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              gap: '20px'
            }}
          >
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3rem, 9vw, 8rem)',
                lineHeight: 0.9,
                color: '#FFD928',
                margin: 0,
                textShadow: '4px 4px 0 #F04438'
              }}
            >
              POP! FOOD STUDIO
            </h1>

            <button
              onClick={() => setIsReservationModalOpen(true)}
              style={{
                backgroundColor: '#F04438',
                color: '#FFF',
                border: '3px solid #FFF',
                borderRadius: '12px',
                padding: '16px 28px',
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                cursor: 'pointer',
                boxShadow: '5px 5px 0 #FFD928',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>CLAIM YOUR TABLE</span>
              <ArrowUpRight size={22} />
            </button>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-headline)',
              fontSize: '1.4rem',
              color: '#FFF5E6',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              margin: 0
            }}
          >
            {config.tagline || 'EAT OUTSIDE THE LINES'} — ARTS DISTRICT, STUDIO CITY
          </p>
        </div>

        {/* 4 Column Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '40px',
            marginBottom: '60px'
          }}
        >
          {/* Col 1: Studio Info */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: '#FFD928',
                fontWeight: 800,
                letterSpacing: '1px',
                marginBottom: '16px',
                textTransform: 'uppercase'
              }}
            >
              [ THE LOCATION ]
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '14px' }}>
              <MapPin size={18} color="#F04438" style={{ flexShrink: 0, marginTop: '3px' }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                {config.address || '742 Evergreen Pop Boulevard, Arts District, Studio City, CA'}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <Phone size={18} color="#2455D6" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>{config.phone || '+1 (555) 767-3663'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Mail size={18} color="#00C389" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>{config.email || 'hello@popfoodstudio.com'}</span>
            </div>
          </div>

          {/* Col 2: Studio Hours */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: '#FFD928',
                fontWeight: 800,
                letterSpacing: '1px',
                marginBottom: '16px',
                textTransform: 'uppercase'
              }}
            >
              [ OPENING HOURS ]
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {config.opening_hours &&
                Object.entries(config.opening_hours).map(([days, hours]) => (
                  <div key={days} style={{ fontSize: '0.9rem' }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, color: '#FFF' }}>{days}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', color: '#AAA', fontSize: '0.85rem' }}>{hours}</div>
                  </div>
                ))}
            </div>
          </div>

          {/* Col 3: Navigation Directory */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: '#FFD928',
                fontWeight: 800,
                letterSpacing: '1px',
                marginBottom: '16px',
                textTransform: 'uppercase'
              }}
            >
              [ EXPLORE STUDIO ]
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { name: 'Our Origin Story', href: '#story' },
                { name: '3D Interactive Tour', href: '#tour' },
                { name: 'Signature Dishes', href: '#featured' },
                { name: 'Full Menu Explorer', href: '#menu' },
                { name: 'Culinary Laboratory', href: '#kitchen' },
                { name: 'Experiences & Events', href: '#experiences' },
                { name: 'Guest Reviews', href: '#reviews' },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  style={{
                    color: '#CCC',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    transition: 'color 0.15s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FFD928')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#CCC')}
                >
                  → {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Col 4: CMS Management & Admin */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: '#FFD928',
                fontWeight: 800,
                letterSpacing: '1px',
                marginBottom: '16px',
                textTransform: 'uppercase'
              }}
            >
              [ STUDIO CONTROL ]
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#AAA', lineHeight: 1.5, marginBottom: '16px' }}>
              Authorized restaurant managers can update dishes, modify 3D tour viewpoints, and triage guest reservations via our decoupled CMS Studio.
            </p>
            <a
              href="/cms/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#2455D6',
                color: '#FFF',
                border: '2px solid #FFF',
                borderRadius: '8px',
                padding: '10px 16px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '3px 3px 0 #FFD928'
              }}
            >
              <span>ACCESS CMS STUDIO</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 245, 230, 0.15)',
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            fontSize: '0.85rem',
            fontFamily: 'var(--font-mono)',
            color: '#888'
          }}
        >
          <div>
            © {new Date().getFullYear()} POP! FOOD STUDIO LLC. ALL RIGHTS RESERVED.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            DESIGNED WITH <Heart size={14} color="#F04438" fill="#F04438" /> FOR FOOD & ART LOVERS
          </div>
        </div>
      </div>
    </footer>
  );
}

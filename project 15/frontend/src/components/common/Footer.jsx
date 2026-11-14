import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { ArrowUpRight, Heart, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const { data, setIsReservationModalOpen } = useCMS();
  const config = data.config || {};

  return (
    <footer
      style={{
        backgroundColor: '#050608',
        color: '#F4F5F8',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '90px 24px 40px 24px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2
        }}
      >
        {/* Top Massive Marquee / Wordmark */}
        <div
          style={{
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '48px',
            marginBottom: '60px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              gap: '24px'
            }}
          >
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3rem, 8.5vw, 7.5rem)',
                lineHeight: 0.95,
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '-2px',
                margin: 0
              }}
            >
              POP! FOOD STUDIO
            </h1>

            <button
              onClick={() => setIsReservationModalOpen(true)}
              style={{
                backgroundColor: '#CCFF00',
                color: '#0A0B0E',
                borderRadius: '999px',
                padding: '16px 32px',
                fontFamily: 'var(--font-display)',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 0 30px rgba(204, 255, 0, 0.35)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>CLAIM A TABLE NOW</span>
              <ArrowUpRight size={18} />
            </button>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              color: '#CCFF00',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              margin: 0
            }}
          >
            {config.tagline || 'EAT OUTSIDE THE LINES'} &bull; ARTS DISTRICT, STUDIO CITY
          </p>
        </div>

        {/* 4 Column Grid */}
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
                fontSize: '11px',
                color: '#646A7E',
                fontWeight: 700,
                letterSpacing: '1px',
                marginBottom: '16px',
                textTransform: 'uppercase'
              }}
            >
              [ THE LOCATION ]
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '14px' }}>
              <MapPin size={16} color="#FF3366" style={{ flexShrink: 0, marginTop: '3px' }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', lineHeight: 1.5, color: '#D4D4D8' }}>
                {config.address || '742 Evergreen Pop Boulevard, Arts District, Studio City, CA'}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <Phone size={15} color="#0066FF" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#9FA5B7' }}>{config.phone || '+1 (555) 767-3663'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Mail size={15} color="#00F0FF" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#9FA5B7' }}>{config.email || 'hello@popfoodstudio.com'}</span>
            </div>
          </div>

          {/* Col 2: Studio Hours */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: '#646A7E',
                fontWeight: 700,
                letterSpacing: '1px',
                marginBottom: '16px',
                textTransform: 'uppercase'
              }}
            >
              [ OPENING HOURS ]
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {config.opening_hours &&
                Object.entries(config.opening_hours).map(([days, hours]) => (
                  <div key={days} style={{ fontSize: '12.5px' }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: '#FFF' }}>{days}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', color: '#8E94A5', fontSize: '11px' }}>{hours}</div>
                  </div>
                ))}
            </div>
          </div>

          {/* Col 3: Navigation Directory */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: '#646A7E',
                fontWeight: 700,
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
                { name: '3D Interactive Studio', href: '#tour' },
                { name: 'Signature Dishes', href: '#featured' },
                { name: 'Full Menu Explorer', href: '#menu' },
                { name: 'Culinary Laboratory', href: '#kitchen' },
                { name: 'Happenings & Brunches', href: '#experiences' },
                { name: 'Guest Reviews', href: '#reviews' },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  style={{
                    color: '#9FA5B7',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    transition: 'color 0.15s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#CCFF00')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#9FA5B7')}
                >
                  &rarr; {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Col 4: CMS Studio Portal */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: '#646A7E',
                fontWeight: 700,
                letterSpacing: '1px',
                marginBottom: '16px',
                textTransform: 'uppercase'
              }}
            >
              [ OPERATIONS OS ]
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#8E94A5', lineHeight: 1.6, marginBottom: '16px' }}>
              Authorized studio managers can update dishes, modify 3D tour viewpoints, and triage guest reservations via our decoupled CMS Studio.
            </p>
            <a
              href="/cms/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: '#FFF',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '999px',
                padding: '10px 18px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11.5px',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              <span>ACCESS STUDIO OS</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '28px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            fontSize: '12px',
            fontFamily: 'var(--font-mono)',
            color: '#646A7E'
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} POP! FOOD STUDIO LLC. ALL RIGHTS RESERVED.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            CRAFTED WITH <Heart size={13} color="#FF3366" fill="#FF3366" /> FOR CONTEMPORARY FOOD LOVERS
          </div>
        </div>
      </div>
    </footer>
  );
}

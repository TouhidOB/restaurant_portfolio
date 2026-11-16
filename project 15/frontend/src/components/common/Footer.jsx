import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { ArrowUpRight, Heart, MapPin, Phone, Mail, Sparkles } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const { data, openReservation, openReservationModal, setIsReservationModalOpen } = useCMS();
  const triggerReservation = openReservationModal || openReservation || (() => setIsReservationModalOpen(true));
  const config = data.config || {};

  const handleLink = (e, path) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

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
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(2.5rem, 7vw, 6.5rem)',
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
              onClick={() => triggerReservation()}
              style={{
                backgroundColor: '#FFDD00',
                color: '#0A0B0E',
                borderRadius: '999px',
                padding: '16px 32px',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '14px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 0 20px rgba(255, 221, 0, 0.4)'
              }}
            >
              <span>Book Table</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
          <p style={{ color: '#8E8EA0', fontSize: '15px', maxWidth: '640px' }}>
            {config.tagline || 'EAT OUTSIDE THE LINES'} — A vibrant dining playground where oversized pop-art aesthetics meet culinary craftsmanship.
          </p>
        </div>

        {/* 4-Column Navigation & Info */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '60px'
          }}
        >
          {/* Col 1: Studio Pages */}
          <div>
            <h4 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#FFDD00', marginBottom: '16px', fontWeight: 800 }}>
              Studio Destinations
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="/story" onClick={(e) => handleLink(e, '/story')} style={{ color: '#8E8EA0', textDecoration: 'none', fontSize: '14px' }}>Brand Story</a>
              <a href="/featured" onClick={(e) => handleLink(e, '/featured')} style={{ color: '#8E8EA0', textDecoration: 'none', fontSize: '14px' }}>Featured Burgers</a>
              <a href="/menu" onClick={(e) => handleLink(e, '/menu')} style={{ color: '#8E8EA0', textDecoration: 'none', fontSize: '14px' }}>Menu Repertoire</a>
              <a href="/tour" onClick={(e) => handleLink(e, '/tour')} style={{ color: '#8E8EA0', textDecoration: 'none', fontSize: '14px' }}>3D Virtual Tour</a>
              <a href="/philosophy" onClick={(e) => handleLink(e, '/philosophy')} style={{ color: '#8E8EA0', textDecoration: 'none', fontSize: '14px' }}>Food Philosophy</a>
            </div>
          </div>

          {/* Col 2: Experiences */}
          <div>
            <h4 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#FF007F', marginBottom: '16px', fontWeight: 800 }}>
              Culinary Lab
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="/kitchen" onClick={(e) => handleLink(e, '/kitchen')} style={{ color: '#8E8EA0', textDecoration: 'none', fontSize: '14px' }}>Open Kitchen Lab</a>
              <a href="/team" onClick={(e) => handleLink(e, '/team')} style={{ color: '#8E8EA0', textDecoration: 'none', fontSize: '14px' }}>Culinary Brigade</a>
              <a href="/experiences" onClick={(e) => handleLink(e, '/experiences')} style={{ color: '#8E8EA0', textDecoration: 'none', fontSize: '14px' }}>VIP Neon Loft Party</a>
              <a href="/blog" onClick={(e) => handleLink(e, '/blog')} style={{ color: '#8E8EA0', textDecoration: 'none', fontSize: '14px' }}>Pop Food Gazette</a>
              <a href="/contact" onClick={(e) => handleLink(e, '/contact')} style={{ color: '#8E8EA0', textDecoration: 'none', fontSize: '14px' }}>Location & Arrival</a>
            </div>
          </div>

          {/* Col 3: Contact */}
          <div>
            <h4 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#00E5FF', marginBottom: '16px', fontWeight: 800 }}>
              Concierge & Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#8E8EA0' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <MapPin size={16} color="#00E5FF" style={{ flexShrink: 0 }} />
                <span>742 Evergreen Pop Boulevard, Arts District, Studio City, CA</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Phone size={16} color="#00E5FF" style={{ flexShrink: 0 }} />
                <span>+1 (555) 767-3663</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Mail size={16} color="#00E5FF" style={{ flexShrink: 0 }} />
                <span>hello@popfoodstudio.com</span>
              </div>
            </div>
          </div>

          {/* Col 4: CMS Studio & Admin */}
          <div>
            <h4 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#FFFFFF', marginBottom: '16px', fontWeight: 800 }}>
              Management Console
            </h4>
            <p style={{ color: '#8E8EA0', fontSize: '13px', marginBottom: '16px' }}>
              Host desk staff and creative editors can manage live reservations and visual pages.
            </p>
            <a
              href="/cms/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '4px',
                color: '#FFDD00',
                textDecoration: 'none',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '12px',
                fontWeight: 700
              }}
            >
              <span>ACCESS CMS STUDIO</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Bottom Credits */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '12px',
            color: '#8E8EA0'
          }}
        >
          <div>© 2026 POP! FOOD STUDIO. ALL RIGHTS RESERVED.</div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>LOS ANGELES, CA</span>
            <span>•</span>
            <span>CONTEMPORARY POP-ART DINING</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

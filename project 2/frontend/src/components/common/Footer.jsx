import React, { useState } from 'react';
import { Instagram, Facebook, Youtube, ArrowUp } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function Footer({ restaurant: propRestaurant, onNavigate, onNavigateHome }) {
  const cms = useCMS();
  const restaurant = propRestaurant || cms?.config || {};
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setTimeout(() => setEmail(''), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLink = (e, path) => {
    e.preventDefault();
    if (path === '/') {
      if (onNavigateHome) onNavigateHome();
    } else {
      if (onNavigate) onNavigate(path);
    }
  };

  return (
    <footer
      style={{
        backgroundColor: '#141715',
        color: '#F2EFE6',
        padding: '90px 0 40px',
        borderTop: '1px solid rgba(182, 161, 123, 0.25)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Top Tier */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '48px',
            marginBottom: '64px',
          }}
        >
          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '2px solid #B6A17B',
                  borderTopColor: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#B6A17B',
                  fontSize: '13px',
                  fontFamily: 'Noto Serif JP, serif',
                }}
              >
                円
              </div>
              <h2 style={{ fontSize: '26px', color: '#F2EFE6', letterSpacing: '0.12em', margin: 0, fontFamily: 'var(--font-display, Cormorant Garamond)' }}>
                {restaurant.name || 'ENSO 圓相'}
              </h2>
            </div>
            <p className="font-jp" style={{ fontSize: '14px', color: '#B6A17B', marginBottom: '12px' }}>
              {restaurant.footer?.japaneseStatement || '心静かに、美味しさを味わう。'}
            </p>
            <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#8E968F', maxWidth: '320px' }}>
              {restaurant.footer?.closingStatement || 'An Invitation to Experience Dining Differently.'}
            </p>
          </div>

          {/* Dedicated Pages Navigation */}
          <div>
            <h4 style={{ fontSize: '14px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#B6A17B', marginBottom: '18px' }}>
              Dedicated Pages
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <a href="/" onClick={(e) => handleLink(e, '/')} style={{ color: '#8E968F', textDecoration: 'none' }}>
                All Sections Landing Page
              </a>
              <a href="/story" onClick={(e) => handleLink(e, '/story')} style={{ color: '#8E968F', textDecoration: 'none' }}>
                Zen Philosophy & Story
              </a>
              <a href="/signatures" onClick={(e) => handleLink(e, '/signatures')} style={{ color: '#8E968F', textDecoration: 'none' }}>
                Signature Plated Highlights
              </a>
              <a href="/menu" onClick={(e) => handleLink(e, '/menu')} style={{ color: '#8E968F', textDecoration: 'none' }}>
                Full Repertoire (With Photos)
              </a>
              <a href="/interior" onClick={(e) => handleLink(e, '/interior')} style={{ color: '#8E968F', textDecoration: 'none' }}>
                Cedar & Stone Architecture
              </a>
              <a href="/tour" onClick={(e) => handleLink(e, '/tour')} style={{ color: '#8E968F', textDecoration: 'none' }}>
                3D Spatial Virtual Tour
              </a>
              <a href="/experience" onClick={(e) => handleLink(e, '/experience')} style={{ color: '#8E968F', textDecoration: 'none' }}>
                Omakase & Tea Ceremonies
              </a>
              <a href="/chef" onClick={(e) => handleLink(e, '/chef')} style={{ color: '#8E968F', textDecoration: 'none' }}>
                Chef Kenji Takahashi
              </a>
              <a href="/blog" onClick={(e) => handleLink(e, '/blog')} style={{ color: '#8E968F', textDecoration: 'none' }}>
                The ENSO Journal & Essays
              </a>
              <a href="/contact" onClick={(e) => handleLink(e, '/contact')} style={{ color: '#8E968F', textDecoration: 'none' }}>
                Concierge & Directions
              </a>
            </div>
          </div>

          {/* Hours Column */}
          <div>
            <h4 style={{ fontSize: '14px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#B6A17B', marginBottom: '18px' }}>
              Service Shifts
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#8E968F' }}>
              {restaurant.hours?.map((h, i) => (
                <div key={i}>
                  <div style={{ color: '#F2EFE6', fontWeight: 500 }}>{h.days}</div>
                  <div>{h.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 style={{ fontSize: '14px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#B6A17B', marginBottom: '18px' }}>
              Sanctuary Letters
            </h4>
            <p style={{ fontSize: '13px', color: '#8E968F', marginBottom: '16px', lineHeight: 1.6 }}>
              Receive seasonal omakase announcements and invitations to private tea ceremonies.
            </p>

            {subscribed ? (
              <div style={{ padding: '12px', backgroundColor: 'rgba(105, 116, 91, 0.25)', border: '1px solid #69745B', color: '#CFE3C4', fontSize: '13px' }}>
                Thank you for connecting with our sanctuary.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#FFFFFF',
                    fontSize: '13px',
                    borderRadius: '2px',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '10px 16px',
                    backgroundColor: '#B6A17B',
                    color: '#141715',
                    border: 'none',
                    borderRadius: '2px',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}
                >
                  Join
                </button>
              </form>
            )}

            <div style={{ marginTop: '24px' }}>
              <a
                href="/cms/overview/"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#B6A17B',
                  textDecoration: 'none',
                }}
              >
                🔒 Staff CMS Portal ↗
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Tier */}
        <div
          style={{
            paddingTop: '32px',
            borderTop: '1px solid rgba(182, 161, 123, 0.15)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '12px',
            color: '#8E968F',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>{restaurant.footer?.copyright || '© 2026 ENSO 圓相 Japanese Zen Dining. All Rights Reserved.'}</div>
          <button
            onClick={scrollToTop}
            style={{
              background: 'none',
              border: 'none',
              color: '#B6A17B',
              fontSize: '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>Back To Top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}

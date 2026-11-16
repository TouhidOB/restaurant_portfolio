import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function Footer({ onNavigate }) {
  const { content, openReservationModal, openReservation } = useCMS();
  const triggerReservation = openReservation || openReservationModal;
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const footerData = content?.editorial_sections?.s15_footer || {
    copyright: "© 2026 Seoul Street Pocha Inc. All rights reserved.",
    heritage: "Hongdae Night Market • Seoul, Republic of Korea",
    tagline: "Contemporary Korean Street Culture Meets Cinematic Digital Experience"
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const handleLink = (e, path) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  return (
    <footer
      style={{
        backgroundColor: '#111316',
        color: '#F6F4F0',
        padding: '5rem 0 3rem',
        borderTop: '2px solid #FF2E88',
        position: 'relative',
      }}
    >
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '3.5rem',
            marginBottom: '4rem',
          }}
        >
          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '8px',
                  backgroundColor: '#1B1D22',
                  border: '1px solid #FF2E88',
                  boxShadow: '0 0 10px rgba(255, 46, 136, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Noto Sans KR', sans-serif",
                  fontSize: '15px',
                  fontWeight: 800,
                  color: '#21D4E8',
                }}
              >
                포차
              </div>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '1.5rem',
                  letterSpacing: '0.08em',
                  color: '#F6F4F0',
                  textTransform: 'uppercase',
                  fontWeight: 800,
                }}
              >
                {content?.restaurant_name || 'SEOUL STREET'}
              </h3>
            </div>
            <p style={{ color: '#B6BAC2', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              {footerData.tagline}
            </p>
            <div style={{ fontSize: '0.82rem', color: '#21D4E8', letterSpacing: '0.08em' }}>
              📍 {content?.site_config?.address || "28 Wausan-ro 21-gil, Mapo-gu, Seoul, Korea"}
            </div>
          </div>

          {/* Service Hours */}
          <div>
            <h4
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.2rem',
                color: '#FF2E88',
                marginBottom: '1.25rem',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Pocha Shifts &amp; Hours
            </h4>
            <div style={{ color: '#B6BAC2', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <strong style={{ color: '#FFFFFF', display: 'block' }}>Daylight Lunch:</strong>
                11:30 – 15:30 (Daily)
              </div>
              <div>
                <strong style={{ color: '#FFFFFF', display: 'block' }}>Twilight Pocha &amp; Late Night:</strong>
                17:00 – 04:00 (Every Single Night)
              </div>
              <div style={{ color: '#21D4E8', fontSize: '0.82rem', marginTop: '4px' }}>
                Walk-ins welcomed all night long!
              </div>
            </div>
          </div>

          {/* Dedicated Navigation Pages */}
          <div>
            <h4
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.2rem',
                color: '#FF2E88',
                marginBottom: '1.25rem',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Standalone Routes
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', padding: 0 }}>
              {[
                { name: 'Street Culture Story', path: '/story' },
                { name: 'Korean Fried Chicken & Wok', path: '/signatures' },
                { name: 'Full Gastronomic Menu', path: '/menu' },
                { name: '3D WebGL Virtual Tour', path: '/tour' },
                { name: 'Atmosphere & Materials', path: '/culture' },
                { name: 'Culinary Artisans & Brigade', path: '/chef' },
                { name: 'Private Pocha Experiences', path: '/experiences' },
                { name: 'Seoul Street Gazette', path: '/blog' },
                { name: 'Arrival & Map Coordinates', path: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.path}
                    onClick={(e) => handleLink(e, item.path)}
                    style={{
                      color: '#B6BAC2',
                      textDecoration: 'none',
                      fontSize: '0.88rem',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = '#21D4E8')}
                    onMouseLeave={(e) => (e.target.style.color = '#B6BAC2')}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Seoul Night Gazette */}
          <div>
            <h4
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.2rem',
                color: '#FF2E88',
                marginBottom: '1.25rem',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Seoul Night Gazette
            </h4>
            <p style={{ color: '#B6BAC2', fontSize: '0.86rem', marginBottom: '1.25rem' }}>
              Get secret midnight menu releases, DJ sets, and exclusive soju tasting invites.
            </p>
            {subscribed ? (
              <div style={{ background: 'rgba(33, 212, 232, 0.15)', color: '#21D4E8', padding: '10px 14px', borderRadius: '4px', fontSize: '0.85rem', border: '1px solid rgba(33, 212, 232, 0.3)' }}>
                ✓ You're on the list for Seoul night drops!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  required
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    borderRadius: '4px',
                    border: '1px solid rgba(246, 244, 240, 0.15)',
                    backgroundColor: '#1B1D22',
                    color: '#FFFFFF',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#FF2E88',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                  }}
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Credits & CMS Shortcut */}
        <div
          style={{
            borderTop: '1px solid rgba(246, 244, 240, 0.12)',
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.82rem',
            color: '#777B83',
          }}
        >
          <div>{footerData.copyright}</div>
          <div>{footerData.heritage}</div>
          <div>
            <a
              href="/cms/"
              target="_blank"
              style={{
                color: '#21D4E8',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: 700,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#21D4E8' }} />
              Open Decoupled CMS Studio &rarr;
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

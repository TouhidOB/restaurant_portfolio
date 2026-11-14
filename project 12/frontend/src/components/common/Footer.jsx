import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function Footer() {
  const { content, openReservationModal } = useCMS();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const footerData = content?.editorial_sections?.s15_footer || {
    copyright: "© 2026 Villa Riviera SAS. All rights reserved.",
    heritage: "Historic Estate Established 1928 — Saint-Jean-Cap-Ferrat",
    tagline: "Coastal Villa Architecture Meets Contemporary Fine Dining"
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--c-navy-dark)',
        color: 'var(--c-ivory)',
        padding: '5rem 0 3rem',
        borderTop: '2px solid var(--c-terracotta)',
        position: 'relative',
      }}
    >
      <div className="container">
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
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  border: '1px solid #E9DFCF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#F7F3EA',
                }}
              >
                VR
              </div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.6rem',
                  letterSpacing: '0.15em',
                  color: '#F7F3EA',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                }}
              >
                {content?.site_config?.site_title || 'VILLA RIVIERA'}
              </h3>
            </div>
            <p style={{ color: '#A9BDB5', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              {footerData.tagline}
            </p>
            <div style={{ fontSize: '0.78rem', color: '#DECDB8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              📍 {content?.site_config?.address || "Saint-Jean-Cap-Ferrat, Côte d'Azur"}
            </div>
          </div>

          {/* Service Hours */}
          <div>
            <h4
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.25rem',
                color: '#FFD2B8',
                marginBottom: '1.25rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Service Hours
            </h4>
            <div style={{ color: '#E9DFCF', fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <strong style={{ color: '#FFFFFF', display: 'block' }}>Lunch Service</strong>
                12:00 – 15:00 (Wednesday to Monday)
              </div>
              <div>
                <strong style={{ color: '#FFFFFF', display: 'block' }}>Dinner Service</strong>
                19:30 – 23:30 (Wednesday to Monday)
              </div>
              <div style={{ color: '#B96F4F', fontSize: '0.82rem', marginTop: '4px' }}>
                Closed Tuesdays for culinary research
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.25rem',
                color: '#FFD2B8',
                marginBottom: '1.25rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                { name: 'Heritage Story', href: '#story' },
                { name: '3D Villa Tour', href: '#tour' },
                { name: 'Menu Repertoire', href: '#menu' },
                { name: 'Architecture & Stone', href: '#architecture' },
                { name: 'Curated Experiences', href: '#experiences' },
                { name: 'Location & Arrival', href: '#location' },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    style={{
                      color: '#E9DFCF',
                      textDecoration: 'none',
                      fontSize: '0.88rem',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = '#B96F4F')}
                    onMouseLeave={(e) => (e.target.style.color = '#E9DFCF')}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Gazette */}
          <div>
            <h4
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.25rem',
                color: '#FFD2B8',
                marginBottom: '1.25rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Riviera Gazette
            </h4>
            <p style={{ color: '#A9BDB5', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              Receive seasonal menus, private cellar releases, and invitations to exclusive coastal dining events.
            </p>
            {subscribed ? (
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34D399', padding: '10px 14px', borderRadius: '4px', fontSize: '0.85rem', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                ✓ Thank you. You are enrolled in the Riviera Gazette.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    borderRadius: '4px',
                    border: '1px solid rgba(233, 223, 207, 0.25)',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    color: '#FFFFFF',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: 'var(--c-terracotta)',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Credits & CMS link */}
        <div
          style={{
            borderTop: '1px solid rgba(233, 223, 207, 0.12)',
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.8rem',
            color: '#8C847B',
          }}
        >
          <div>{footerData.copyright}</div>
          <div>{footerData.heritage}</div>
          <div>
            <a
              href="/cms/"
              target="_blank"
              style={{
                color: '#FFD2B8',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: 600,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#10B981' }} />
              Open CMS Studio &rarr;
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
